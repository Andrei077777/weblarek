import './scss/styles.scss';
import { Products } from './components/models/Products';
import { Api } from './components/base/Api'; // Импортируем класс Api
import { ApiService } from './components/base/ApiService'; // Импортируем наш новый класс

// ... импорты Cart, Buyer и тестовых данных ...
import { apiProducts } from './utils/data';
import { API_URL } from './utils/constants';
import { ApiProductsResponse } from './types/index.ts';

// --- Тестирование моделей данных (как было раньше) ---
console.log('--- Тестирование Каталога (модель) ---');
const productsModel = new Products();
productsModel.setItems(apiProducts.items); // Используем тестовые данные
console.log('Массив товаров из каталога (тест):', productsModel.getItems());


// --- НОВОЕ: Подключение к серверу и получение реальных данных ---
console.log('\n--- Подключение к серверу и получение каталога ---');

// 1. Создаем экземпляр низкоуровневого API-клиента
const apiClient = new Api(API_URL);

// 2. Создаем экземпляр нашего сервисного слоя, передав ему API-клиент
const apiService = new ApiService(apiClient);

// 3. Выполняем асинхронный запрос на сервер для получения товаров
apiService.getProducts().then((serverResponse: ApiProductsResponse) => {
  console.log('Объект, полученный от сервера:', serverResponse);

  // --- Интеграция с моделью данных ---
  // Берем массив товаров из ответа сервера и сохраняем его в модель каталога
  productsModel.setItems(serverResponse.items);

  // Выводим в консоль обновленный каталог, чтобы убедиться, что все работает
  console.log('\nКаталог успешно загружен с сервера:');
  console.log(productsModel.getItems());
}).catch((error) => {
  console.error('Произошла ошибка при запросе к серверу:', error);
});
