import { IProduct } from '../../types/index.ts';
import { IApi } from '../../types/index.ts'; // Импортируем интерфейс API

export class Products {
  private items: IProduct[] = [];
  private selectedProduct: IProduct | null = null;
  private api: IApi; // Сохраняем ссылку на API-клиент

  constructor(api: IApi) {
    this.api = api;
  }

  // Получение товаров происходит через API
  async loadItems(): Promise<void> {
    const data = await this.api.get<{ total: number; items: IProduct[] }>('/product');
    this.items = data.items;
  }

  // Позволяет положить товары в модель напрямую (например, статичные данные для тестов)
  setItems(items: IProduct[]): void {
    this.items = items;
  }

  getItems(): IProduct[] {
    return this.items;
  }

  getItemById(id: string): IProduct | undefined {
    return this.items.find(item => item.id === id);
  }

  setSelectedProduct(product: IProduct): void {
    this.selectedProduct = product;
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}
