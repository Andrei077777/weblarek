import { IProduct } from '../../types/index.ts';

export class Cart {

  private items: IProduct[] = [];

  constructor() { }

  getItems(): IProduct[] {
    return this.items;
  }

  // Метод только обновляет локальный массив
  async addItem(product: IProduct): Promise<void> {
    if (!this.isInCart(product.id)) {
      this.items.push(product);
    }
  }

  // Метод только обновляет локальный массив
  async removeItem(id: string): Promise<void> {
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
