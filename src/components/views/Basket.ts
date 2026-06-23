import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { IBasketView } from '../../types';
import { ensureElement, createElement } from '../../utils/utils';
import { Events } from '../../utils/constants';

/**
 * Корзина (темплейт #basket).
 * Отображает список выбранных товаров, их общую стоимость и кнопку оформления.
 */
export class Basket extends Component<IBasketView> {
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._list = ensureElement<HTMLElement>('.basket__list', container);
        this._total = ensureElement<HTMLElement>('.basket__price', container);
        this._button = ensureElement<HTMLButtonElement>('.basket__button', container);

        this._button.addEventListener('click', () => {
            this.events.emit(Events.ORDER_OPEN);
        });
    }

    set items(items: HTMLElement[]) {
        if (items.length) {
            this._list.replaceChildren(...items);
            this.setDisabled(this._button, false);
        } else {
            this._list.replaceChildren(
                createElement<HTMLParagraphElement>('p', { textContent: 'Корзина пуста' })
            );
            this.setDisabled(this._button, true);
        }
    }

    set total(value: number) {
        this.setText(this._total, `${value} синапсов`);
    }
}
