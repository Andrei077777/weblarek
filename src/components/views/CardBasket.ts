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

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this._index = ensureElement<HTMLElement>('.basket__item-index', container);
        this._deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

        this._deleteButton.addEventListener('click', () => {
            this.events.emit(Events.CARD_REMOVE, { id: this._id });
        });
    }

    set index(value: number) {
        this.setText(this._index, value);
    }
}
