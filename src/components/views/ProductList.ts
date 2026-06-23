import { ProductCardGallery } from './ProductCardGallery';
import { ListBase } from './ListBase';
import { IProduct } from '../../types/index.ts';


export class ProductList extends ListBase<ProductCardGallery> {
    constructor(container: HTMLDivElement) {
        super(container);
    }

    // Реализация абстрактного метода
    protected override renderHTML(data?: ProductCardGallery[]): HTMLElement {
        // Очищаем контейнер
        this.root.innerHTML = '';

        // Если передан массив данных, используем его, иначе рендерим текущий массив
        const itemsToRender = data || this.props;

        // Рендерим каждый элемент
        itemsToRender.forEach(item => {
            this.root.appendChild(item.render());
        });

        return this.root;
    }

    // Метод для загрузки и рендеринга списка товаров
    renderProducts(products: IProduct[]): void {
        // Создаем массив карточек
        const cards = products.map(product => new ProductCardGallery(product, document.createElement('div')));
        // Рендерим список с передачей массива
        this.render(cards);
    }
}