import { View } from '../base/View';
import { EventEmitter } from '../base/Events'; // Импортируем брокер событий

export class SuccessScreen extends View<any> {
    // Локальная ссылка на брокер событий
    private emitter: EventEmitter;

    constructor(container: HTMLDivElement, emitter: EventEmitter) {
        super(container);
        this.emitter = emitter;
    }

    protected override renderHTML(): HTMLElement {
        this.root.innerHTML = `
            <h2>Заказ оформлен!</h2>
            <button>Вернуться в галерею</button>
        `;

        const backBtn = this.root.querySelector('button')!;
        backBtn.addEventListener('click', () => {
            this.emitter.emit('RETURN_TO_GALLERY');
        });

        return this.root;
    }
}