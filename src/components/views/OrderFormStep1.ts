import { FormBase } from './FormBase';
import { IBuyer } from '../../types/index.ts';

export class OrderFormStep1 extends FormBase<Partial<IBuyer>> {
    constructor(formContainer: HTMLDivElement) {
        super(formContainer);
    }

    // Реализация абстрактного метода
    protected override renderHTML(): HTMLElement {
        // Рендерим форму (пример)
        this.formEl.innerHTML = `
            <label>Вид оплаты:</label>
            <select name="payment">
                <option value="">Выберите...</option>
                <option value="card">Банковская карта</option>
                <option value="cash">Наличными</option>
            </select>

            <label>Адрес доставки:</label>
            <textarea name="address" placeholder="Введите адрес"></textarea>

            <button type="submit">Далее</button>
        `;

        return this.formEl;
    }

    validate(): boolean {
        const data = this.collectData();
        // Проверка обязательных полей
        return Boolean(data.payment && data.address);
    }
}