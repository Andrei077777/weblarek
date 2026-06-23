import { View } from '../base/View';

export class ModalWindow extends View<any> {
    private modalEl: HTMLDivElement;

    constructor(modalRoot: HTMLDivElement) {
        super(modalRoot);
        this.modalEl = modalRoot;
        this.hide();
    }

    // Реализация обязательного метода
    protected override renderHTML(data?: any): HTMLElement {
        // Рендерим только само модальное окно, без содержимого
        return this.modalEl;
    }

    open(content: View<any>): void {
        this.modalEl.classList.add('modal_active');
        this.modalEl.innerHTML = '';
        this.modalEl.appendChild(content.render());
    }

    hide(): void {
        this.modalEl.classList.remove('modal_active');
    }
}