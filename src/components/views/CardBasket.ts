import { Card } from './Card';
import { IEvents } from '../base/Events';
import { ICardBasket } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Events } from '../../utils/constants';

/**
 * Строка товара в корзине (темплейт #card-basket).
 * По клику на кнопку удаления генерирует событие удаления товара из корзины.
 */
export class CardBasket extends Card<ICardBasket> {
    protected _index: HTMLElement;
    protected _deleteButton: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents, protected onClick: () => void) {
        super(container, events);
        this._index = ensureElement<HTMLElement>('.basket__item-index', container);
        this._deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

        this.container.addEventListener('click', () => {
            this.onClick();
        });
    }

    set index(value: number) {
        this.setText(this._index, value);
    }
}
