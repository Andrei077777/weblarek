import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { IFormState } from '../../types';
import { ensureElement } from '../../utils/utils';

/**
 * Базовый класс формы.
 * Выносит общий для обеих форм оформления функционал: обработку ввода и сабмита,
 * управление кнопкой отправки и выводом ошибок.
 * Имена событий строятся от атрибута name формы: `<name>:change` и `<name>:submit`.
 */
export abstract class Form<T> extends Component<T & IFormState> {
    protected _submit: HTMLButtonElement;
    protected _errors: HTMLElement;
    protected formName: string;

    constructor(container: HTMLFormElement, protected events: IEvents) {
        super(container);

        this.formName = container.getAttribute('name') ?? '';
        this._submit = ensureElement<HTMLButtonElement>('button[type=submit]', container);
        this._errors = ensureElement<HTMLElement>('.form__errors', container);

        // Любое изменение в полях формы уведомляет Презентер
        container.addEventListener('input', (evt: Event) => {
            const target = evt.target as HTMLInputElement;
            this.events.emit(`${this.formName}:change`, {
                field: target.name,
                value: target.value,
            });
        });

        // Отправка формы
        container.addEventListener('submit', (evt: Event) => {
            evt.preventDefault();
            this.events.emit(`${this.formName}:submit`);
        });
    }

    set valid(value: boolean) {
        this.setDisabled(this._submit, !value);
    }

    set errors(value: string) {
        this.setText(this._errors, value);
    }
}
