import { IProduct } from '../../types/index.ts';
import { IApi, ApiPostMethods } from '../../types/index.ts'; // Импортируем интерфейс API и тип методов

export class Cart {
  private items: IProduct[] = [];
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  getItems(): IProduct[] {
    return this.items;
  }

  // Добавление товара в корзину: обновляем локальный массив и отправляем запрос на сервер
  async addItem(product: IProduct): Promise<void> {
    if (!this.isInCart(product.id)) {
      this.items.push(product);
      //await this.api.post<void>('/cart', { productId: product.id }, ApiPostMethods.POST);
      await Promise.resolve();
    }
  }

  // Удаление товара из корзины: обновляем локальный массив и отправляем запрос на сервер
  async removeItem(id: string): Promise<void> {
    this.items = this.items.filter(item => item.id !== id);
   // await this.api.post<void>('/cart', { productId: id }, ApiPostMethods.DELETE);
   await Promise.resolve();
  }

  clear(): void {
    this.items = [];
    // Здесь также можно было бы вызвать API для очистки корзины на сервере
  }

  getTotalPrice(): number {
    return this.items.reduce((total, item) => total + (item.price || 0), 0);
  }

  getCount(): number {
    return this.items.length;
  }

  isInCart(id: string): boolean {
    return this.items.some(item => item.id === id);
  }
}
