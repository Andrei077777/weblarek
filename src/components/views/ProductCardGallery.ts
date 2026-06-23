// 1. Импортируем интерфейс IProduct
import { IProduct } from '../../types/index.ts';
import { ProductCardBase } from './ProductCardBase';

export class ProductCardGallery extends ProductCardBase {
    constructor(product: IProduct, container: HTMLDivElement) {
        super(product, container);
    }

    // 2. Реализуем обязательный метод
    protected override renderHTML(): HTMLElement {
        // Создаем корневой элемент карточки
        const cardEl = document.createElement('div');
        cardEl.className = 'card';

        // SVG-паттерн (силуэт)
        const svgPath = this.product.image;
        const svgTemplate = `
            <svg class="card__image" viewBox="0 0 100 100">
                <path d="${svgPath}" fill="#fff"/>
            </svg>
        `;

        // Собираем разметку
        cardEl.innerHTML = `
            ${this.renderCategory()} <!-- Фон категории -->
            ${svgTemplate} <!-- Силуэт -->
            ${this.renderTitleAndPrice()} <!-- Название и цена -->
            <button class="card__buy-btn">Купить</button>
        `;

        return cardEl;
    }
}