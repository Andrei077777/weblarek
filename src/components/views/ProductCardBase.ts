import { View } from '../base/View';
import { IProduct } from '../../types/index.ts';
import { categoryMap } from '../../utils/constants';

export abstract class ProductCardBase extends View<IProduct> {
    // 1. Добавляем поле для хранения продукта
    protected product: IProduct;

    // 2. Конструктор принимает продукт и контейнер
    constructor(product: IProduct, container: HTMLDivElement) {
        super(container);
        this.product = product;
    }

    // 3. Переопределяем метод render с правильной сигнатурой
    override render(): HTMLElement {
        // Рендерим карточку (конкретная реализация будет в наследниках)
        const cardEl = document.createElement('div');
        cardEl.className = 'card';

        // Общая логика для всех карточек
        cardEl.innerHTML += this.renderCategory();
        cardEl.innerHTML += this.renderTitleAndPrice();

        return cardEl;
    }

    // Вспомогательный метод для отрисовки категории
    protected renderCategory(): string {
        const categoryClass = categoryMap[this.product.category] || '';
        return `<div class="card__category ${categoryClass}"></div>`;
    }

    // Вспомогательный метод для отрисовки названия и цены
    protected renderTitleAndPrice(): string {
        return `
            <h3 class="card__title">${this.product.title}</h3>
            <p class="card__price">₽${this.product.price}</p>
        `;
    }
}