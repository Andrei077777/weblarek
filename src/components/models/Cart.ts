import { IProduct } from '../../types/index.ts';
import { IEvents } from '../base/Events';
import { Events } from '../../utils/constants';

export class Cart {

  private items: IProduct[] = [];

  // Модель получает брокер событий, чтобы уведомлять об изменениях корзины
  constructor(protected events: IEvents) { }

  getItems(): IProduct[] {
    return this.items;
  }

  // Добавляет товар в корзину, если его там ещё нет
  addItem(product: IProduct): void {
    if (!this.isInCart(product.id)) {
      this.items.push(product);
      this.events.emit(Events.CART_CHANGED);
    }
  }

  // Удаляет товар из корзины по его id
  removeItem(id: string): void {
    this.items = this.items.filter(item => item.id !== id);
    this.events.emit(Events.CART_CHANGED);
  }

  clear(): void {
    this.items = [];
    this.events.emit(Events.CART_CHANGED);
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
