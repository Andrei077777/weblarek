import { Form } from './Form';
import { IEvents } from '../base/Events';
import { IOrderForm, TPayment } from '../../types';
import { ensureElement } from '../../utils/utils';

/**
 * Форма первого шага оформления заказа (темплейт #order).
 * Выбор способа оплаты и ввод адреса доставки.
 */
export class OrderForm extends Form<IOrderForm> {
    protected _paymentButtons: HTMLButtonElement[];
    protected _address: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this._paymentButtons = Array.from(
            container.querySelectorAll<HTMLButtonElement>('.button_alt')
        );
        this._address = ensureElement<HTMLInputElement>('input[name=address]', container);

        // Кнопки выбора оплаты — не input, поэтому уведомляем о выборе вручную
        this._paymentButtons.forEach((button) => {
            button.addEventListener('click', () => {
                this.events.emit(`${this.formName}:change`, {
                    field: 'payment',
                    value: button.name,
                });
            });
        });
    }

    // Подсветка выбранного способа оплаты модификатором 'button_alt-active'
    set payment(value: TPayment | null) {
        this._paymentButtons.forEach((button) => {
            this.toggleClass(button, 'button_alt-active', button.name === value);
        });
    }

    set address(value: string) {
        this._address.value = value;
    }
}
