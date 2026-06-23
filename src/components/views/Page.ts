import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { IPage } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Events } from '../../utils/constants';

/**
 * Главная страница приложения.
 * Отвечает за каталог товаров (<main class="gallery">) и за кнопку корзины
 * со счётчиком в шапке.
 */
export class Page extends Component<IPage> {
    protected _counter: HTMLElement;
    protected _catalog: HTMLElement;
    protected _basketButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._counter = ensureElement<HTMLElement>('.header__basket-counter', container);
        this._catalog = ensureElement<HTMLElement>('.gallery', container);
        this._basketButton = ensureElement<HTMLButtonElement>('.header__basket', container);

        this._basketButton.addEventListener('click', () => {
            this.events.emit(Events.BASKET_OPEN);
        });
    }

    // Счётчик товаров в корзине
    set counter(value: number) {
        this.setText(this._counter, value);
    }

    // Список карточек каталога
    set catalog(items: HTMLElement[]) {
        this._catalog.replaceChildren(...items);
    }
}
