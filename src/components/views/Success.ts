import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { ISuccess } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Events } from '../../utils/constants';

/**
 * Экран успешного оформления заказа (темплейт #success).
 * По клику на кнопку генерирует событие закрытия окна.
 */
export class Success extends Component<ISuccess> {
    protected _description: HTMLElement;
    protected _close: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._description = ensureElement<HTMLElement>('.order-success__description', container);
        this._close = ensureElement<HTMLButtonElement>('.order-success__close', container);

        this._close.addEventListener('click', () => {
            this.events.emit(Events.SUCCESS_CLOSE);
        });
    }

    set total(value: number) {
        this.setText(this._description, `Списано ${value} синапсов`);
    }
}
