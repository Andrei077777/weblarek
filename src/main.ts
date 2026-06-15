import './scss/styles.scss';
import { Products } from './components/models/Products';
import { Cart } from './components/models/Cart';
import { Buyer } from './components/models/Buyer';
import { Api } from './components/base/Api';
import { ApiService } from './components/base/ApiService';

import { apiProducts } from './utils/data';
import { API_URL } from './utils/constants';
import type { ApiProductsResponse } from './types/index';

// ===== Тестирование модели Каталога (Products) =====
console.log('--- Тестирование Каталога (Products) ---');
const productsModel = new Products();

productsModel.setItems(apiProducts.items); // используем тестовые данные
console.log('Все товары каталога:', productsModel.getItems());

const firstId = apiProducts.items[0].id;
console.log('Товар по id:', productsModel.getItemById(firstId));

productsModel.setSelectedProduct(apiProducts.items[0]);
console.log('Выбранный для просмотра товар:', productsModel.getSelectedProduct());

// ===== Тестирование модели Корзины (Cart) =====
console.log('\n--- Тестирование Корзины (Cart) ---');
const cart = new Cart();

cart.addItem(apiProducts.items[0]);
cart.addItem(apiProducts.items[1]);
console.log('Товары в корзине:', cart.getItems());
console.log('Количество товаров:', cart.getCount());
console.log('Стоимость товаров:', cart.getTotalPrice());
console.log('Есть ли первый товар в корзине:', cart.isInCart(firstId));

cart.removeItem(firstId);
console.log('Корзина после удаления первого товара:', cart.getItems());
console.log('Есть ли первый товар после удаления:', cart.isInCart(firstId));

cart.clear();
console.log('Корзина после очистки:', cart.getItems());

// ===== Тестирование модели Покупателя (Buyer) =====
console.log('\n--- Тестирование Покупателя (Buyer) ---');
const buyer = new Buyer();

// Частичное заполнение — проверяем, что значения не затирают друг друга
buyer.setPayment('card');
buyer.setAddress('г. Москва, ул. Пушкина, д. 1');
console.log('Данные после частичного заполнения:', buyer.getData());
console.log('Ошибки валидации (email и phone ещё пустые):', buyer.validate());

buyer.setEmail('test@example.com');
buyer.setPhone('+79991234567');
console.log('Данные после полного заполнения:', buyer.getData());
console.log('Ошибки валидации (все поля заполнены):', buyer.validate());

buyer.clear();
console.log('Данные после очистки:', buyer.getData());

// ===== Подключение к серверу и получение каталога =====
console.log('\n--- Подключение к серверу и получение каталога ---');

// 1. Низкоуровневый API-клиент
const apiClient = new Api(API_URL);

// 2. Сервисный слой, которому передаём API-клиент (композиция)
const apiService = new ApiService(apiClient);

// 3. Асинхронный запрос на сервер за каталогом товаров
apiService.getProducts().then((serverResponse: ApiProductsResponse) => {
  console.log('Объект, полученный от сервера:', serverResponse);

  // Сохраняем массив товаров с сервера в модель каталога
  productsModel.setItems(serverResponse.items);

  console.log('\nКаталог успешно загружен с сервера:');
  console.log(productsModel.getItems());
}).catch((error) => {
  console.error('Произошла ошибка при запросе к серверу:', error);
});
