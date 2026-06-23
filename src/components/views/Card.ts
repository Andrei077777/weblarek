import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

/**
 * Базовый класс карточки товара.
 * Выносит общий для всех трёх темплейтов карточки функционал:
 * хранение id (нужен только для генерации событий) и вывод названия и цены.
 */
export abstract class Card<T> extends Component<T> {
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _id = '';

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this._title = ensureElement<HTMLElement>('.card__title', container);
        this._price = ensureElement<HTMLElement>('.card__price', container);
    }

    // id товара хранится для передачи в событиях, данными модели не является
    set id(value: string) {
        this._id = value;
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    set price(value: number | null) {
        this.setText(this._price, value === null ? 'Бесценно' : `${value} синапсов`);
    }
}
