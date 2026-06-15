import { IProduct } from '../../types/index.ts';

export class Cart {

  private items: IProduct[] = [];

  constructor() { }

  getItems(): IProduct[] {
    return this.items;
  }

  // Добавляет товар в корзину, если его там ещё нет
  addItem(product: IProduct): void {
    if (!this.isInCart(product.id)) {
      this.items.push(product);
    }
  }

  // Удаляет товар из корзины по его id
  removeItem(id: string): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  clear(): void {
    this.items = [];
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
