import { IApi } from '../../types/index.ts';
import { ApiProductsResponse, IOrderRequest, OrderConfirmation } from '../../types/index.ts';

export class ApiService {
  private api: IApi;

  // Принимает в конструктор объект, реализующий интерфейс IApi
  constructor(api: IApi) {
    this.api = api;
  }

  // Метод для получения каталога товаров
  async getProducts(): Promise<ApiProductsResponse> {
    // Используем метод get из внедренного объекта api
    const response = await this.api.get<ApiProductsResponse>('/product/');
    return response;
  }

  // Метод для отправки заказа на сервер
  // Принимает данные покупателя вместе со списком id товаров и итоговой суммой
  async sendOrder(orderData: IOrderRequest): Promise<OrderConfirmation> {
    // Используем метод post из внедренного объекта api
    const response = await this.api.post<OrderConfirmation>(
      '/order/',
      orderData,
    );
    return response;
  }
}