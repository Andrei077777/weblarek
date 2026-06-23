import { Card } from './Card';
import { IEvents } from '../base/Events';
import { ICardCatalog } from '../../types';
import { ensureElement } from '../../utils/utils';
import { categoryMap, Events } from '../../utils/constants';

/**
 * Карточка товара в каталоге (темплейт #card-catalog).
 * По клику на всю карточку генерирует событие выбора товара для просмотра.
 */
export class CardCatalog extends Card<ICardCatalog> {
    protected _category: HTMLElement;
    protected _image: HTMLImageElement;

    constructor(
        container: HTMLElement,
        events: IEvents,
        protected onClick: () => void
    ) {
        super(container, events);

        this._category = ensureElement<HTMLElement>(
            '.card__category',
            container
        );
        this._image = ensureElement<HTMLImageElement>(
            '.card__image',
            container
        );

        this.container.addEventListener('click', () => {
            this.onClick();
        });
    }

    set category(value: string) {
        this.setText(this._category, value);

        this._category.className = 'card__category';

        const modifier = categoryMap[value];

        if (modifier) {
            this.toggleClass(this._category, modifier, true);
        }
    }

    set image(value: string) {
        this.setImage(
            this._image,
            value,
            this._title.textContent ?? ''
        );
    }
}
