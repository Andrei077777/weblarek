import { IProduct } from '../../types/index.ts';
// Импорт IApi убран, так как модель не должна зависеть от API

export class Products {
  // Поле для хранения API-клиента удалено
  // private api: IApi;

  private items: IProduct[] = [];
  private selectedProduct: IProduct | null = null;

  // Конструктор оставлен пустым, как того требует ТЗ
  constructor() { }

  // Метод loadItems() удален, так как получение данных - не задача модели.
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
