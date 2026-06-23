import { View } from '../base/View';
// Меняем ограничение дженерика
export abstract class FormBase<FieldValues extends Record<string, string | null>> extends View<FieldValues> {
    protected formEl: HTMLFormElement;

    constructor(formContainer: HTMLDivElement) {
        super(formContainer);
        this.formEl = formContainer.querySelector('form')!;
    }

    // Метод для сбора данных из полей формы
    protected collectData(): FieldValues {
        if (!this.formEl.reportValidity()) {
            return {} as FieldValues;
        }

        const inputs = this.formEl.querySelectorAll('[name]');
        const validInputs = Array.from(inputs)
            .filter(el =>
                el instanceof HTMLInputElement ||
                el instanceof HTMLSelectElement ||
                el instanceof HTMLTextAreaElement
            )
            .map(el => [el.name, el.value]);

        return Object.fromEntries(validInputs) as FieldValues;
    }

    // Метод для валидации (будет переопределен в дочерних классах)
    abstract validate(): boolean;
}