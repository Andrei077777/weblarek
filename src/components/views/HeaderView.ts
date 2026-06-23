import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';
import { Events } from '../../utils/constants';

export interface IHeader {
    counter: number;
}

export class HeaderView extends Component<IHeader> {
    protected _counter: HTMLElement;
    protected _basketButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._counter = ensureElement<HTMLElement>(
            '.header__basket-counter',
            container
        );

        this._basketButton = ensureElement<HTMLButtonElement>(
            '.header__basket',
            container
        );

        this._basketButton.addEventListener('click', () => {
            this.events.emit(Events.BASKET_OPEN);
        });
    }

    set counter(value: number) {
        this.setText(this._counter, value);
    }
}