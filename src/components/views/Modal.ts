import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';
import { Events } from '../../utils/constants';

interface IModalData {
    content: HTMLElement;
}

/**
 * Модальное окно.
 * Самостоятельный компонент — от него не наследуются другие классы.
 * В него можно поместить разметку любого другого компонента через сеттер content.
 * Видимость переключается модификатором 'modal_active'.
 */
export class Modal extends Component<IModalData> {
    protected _closeButton: HTMLButtonElement;
    protected _content: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
        this._content = ensureElement<HTMLElement>('.modal__content', container);

        // Закрытие по крестику
        this._closeButton.addEventListener('click', () => this.close());
        // Закрытие по клику вне контейнера (по оверлею)
        this.container.addEventListener('mousedown', (evt) => {
            if (evt.target === this.container) this.close();
        });
    }

    set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }

    open() {
        this.toggleClass(this.container, 'modal_active', true);
    }

    close() {
        this.toggleClass(this.container, 'modal_active', false);
        this._content.replaceChildren();
        this.events.emit(Events.MODAL_CLOSE);
    }
}
