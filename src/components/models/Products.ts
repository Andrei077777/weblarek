import { IProduct } from '../../types/index.ts';

export class Products {
  
  private items: IProduct[] = [];
  private selectedProduct: IProduct | null = null;

  constructor() { }

  // Теперь данные в модель загружаются извне (например, из ApiService).

  // Метод для заполнения модели данными (например, полученными от ApiService)
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
