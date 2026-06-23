import { IProduct } from '../../types/index.ts';
import { IEvents } from '../base/Events';
import { Events } from '../../utils/constants';

export class Products {

  private items: IProduct[] = [];
  private selectedProduct: IProduct | null = null;

  // Модель получает брокер событий, чтобы уведомлять об изменениях данных
  constructor(protected events: IEvents) { }

  // Метод для заполнения модели данными (например, полученными от ApiService)
  setItems(items: IProduct[]): void {
    this.items = items;
    this.events.emit(Events.CATALOG_CHANGED);
  }

  getItems(): IProduct[] {
    return this.items;
  }

  getItemById(id: string): IProduct | undefined {
    return this.items.find(item => item.id === id);
  }

  setSelectedProduct(product: IProduct): void {
    this.selectedProduct = product;
    this.events.emit(Events.PREVIEW_CHANGED);
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}
