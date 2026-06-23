import { Card } from './Card';
import { IEvents } from '../base/Events';
import { ICardPreview } from '../../types';
import { ensureElement } from '../../utils/utils';
import { categoryMap, Events } from '../../utils/constants';

/**
 * Карточка товара в детальном просмотре (темплейт #card-preview).
 * Текст и состояние кнопки полностью задаёт Презентер; класс лишь сообщает о нажатии,
 * а решение «добавить или удалить» принимает Презентер по состоянию корзины.
 */
export class CardPreview extends Card<ICardPreview> {
    protected _category: HTMLElement;
    protected _image: HTMLImageElement;
    protected _description: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this._category = ensureElement<HTMLElement>('.card__category', container);
        this._image = ensureElement<HTMLImageElement>('.card__image', container);
        this._description = ensureElement<HTMLElement>('.card__text', container);
        this._button = ensureElement<HTMLButtonElement>('.card__button', container);

        this._button.addEventListener('click', () => {
            this.events.emit(Events.CARD_ADD, { id: this._id });
        });
    }

    set category(value: string) {
        this.setText(this._category, value);
        this._category.className = 'card__category';
        const modifier = categoryMap[value];
        if (modifier) this.toggleClass(this._category, modifier, true);
    }

    set image(value: string) {
        this.setImage(this._image, value, this._title.textContent ?? '');
    }

    set description(value: string) {
        this.setText(this._description, value);
    }

    set button(value: string) {
        this.setText(this._button, value);
    }

    set buttonDisabled(value: boolean) {
        this.setDisabled(this._button, value);
    }
}
