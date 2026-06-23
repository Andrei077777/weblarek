import { Form } from './Form';
import { IEvents } from '../base/Events';
import { IContactsForm } from '../../types';
import { ensureElement } from '../../utils/utils';

/**
 * Форма второго шага оформления заказа (темплейт #contacts).
 * Ввод почты и телефона покупателя.
 */
export class ContactsForm extends Form<IContactsForm> {
    protected _email: HTMLInputElement;
    protected _phone: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
        this._email = ensureElement<HTMLInputElement>('input[name=email]', container);
        this._phone = ensureElement<HTMLInputElement>('input[name=phone]', container);
    }

    set email(value: string) {
        this._email.value = value;
    }

    set phone(value: string) {
        this._phone.value = value;
    }
}
