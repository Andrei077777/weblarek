import './scss/styles.scss';
import { Api } from './components/base/Api';
import { Products } from './components/models/Products';
import { Cart } from './components/models/Cart';
import { Buyer } from './components/models/Buyer';
import { apiProducts } from './utils/data';
import { API_URL } from './utils/constants';

// Единый API-клиент, который передаём во все модели
const api = new Api(API_URL);

async function main() {
  // --- Тестирование класса Products ---
  console.log('--- Тестирование Каталога ---');
  const productsModel = new Products(api);
  productsModel.setItems(apiProducts.items);
  console.log('Массив товаров из каталога:', productsModel.getItems());

  const sampleProduct = apiProducts.items[0];
  productsModel.setSelectedProduct(sampleProduct);
  console.log('Выбранный товар:', productsModel.getSelectedProduct());
  console.log('Товар по ID:', productsModel.getItemById(sampleProduct.id));


  // --- Тестирование класса Cart ---
  console.log('\n--- Тестирование Корзины ---');
  const cartModel = new Cart(api);
  console.log('Начальное количество:', cartModel.getCount());
  console.log('Начальная стоимость:', cartModel.getTotalPrice());
  console.log('Товар в корзине?', cartModel.isInCart(sampleProduct.id));

  try {
    await cartModel.addItem(sampleProduct);
  } catch (error) {
    console.warn('Запрос корзины на сервер не выполнен (это нормально без бэкенда):', error);
  }
  console.log('Количество после добавления:', cartModel.getCount());
  console.log('Стоимость после добавления:', cartModel.getTotalPrice());
  console.log('Товар в корзине?', cartModel.isInCart(sampleProduct.id));
  console.log('Содержимое корзины:', cartModel.getItems());

  try {
    await cartModel.removeItem(sampleProduct.id);
  } catch (error) {
    console.warn('Запрос корзины на сервер не выполнен (это нормально без бэкенда):', error);
  }
  console.log('Количество после удаления:', cartModel.getCount());


  // --- Тестирование класса Buyer ---
  console.log('\n--- Тестирование Покупателя ---');
  const buyerModel = new Buyer(api);
  buyerModel.setData({ address: 'ул. Пушкина, д. Колотушкина', payment: 'card' });
  buyerModel.setEmail('test@mail.com');
  buyerModel.setPhone('+79991112233');
  console.log('Данные покупателя:', buyerModel.getData());
  console.log('Ошибки валидации:', buyerModel.validate()); // Должно быть {}


  // --- Загрузка каталога с сервера через API ---
  console.log('\n--- Загрузка товаров с сервера ---');
  try {
    await productsModel.loadItems();
    console.log('Товары загружены с сервера:', productsModel.getItems());
  } catch (error) {
    console.error('Не удалось загрузить товары с сервера:', error);
  }
}

main();
