// Abstract в названии файла подчеркивает его назначение
// (хотя это не обязательное требование)

/**
 * Абстрактный базовый класс для всех компонентов интерфейса.
 * Работает с любыми данными (дженерик T).
 */
export abstract class View<T = object> {
    // Корневой элемент компонента (куда мы будем вставлять разметку)
    protected readonly root: HTMLElement;

    // Конструктор принимает DOM-элемент, за который отвечает компонент
    constructor(root: HTMLElement) {
        this.root = root;
    }

    // Главный метод для отрисовки компонента
    // Может принимать данные для отображения (дженерик T)
    render(data?: T): HTMLElement {
    this.root.innerHTML = '';
    const renderedElement = this.renderHTML(data);
    this.root.appendChild(renderedElement);
    return this.root; // Возвращаем корневой элемент
}

    // Абстрактный метод для формирования HTML-разметки
    // Его ОБЯЗАНЫ переопределить в дочерних классах
    protected abstract renderHTML(data?: T): HTMLElement;

    // Вспомогательный метод для работы с изображениями
    // Нужен для корректной обработки ошибок загрузки
    protected setImage(imgEl: HTMLImageElement, src: string, alt?: string) {
        imgEl.src = src;
        imgEl.alt = alt || '';

        // Обработчик на случай, если изображение не загрузилось
        imgEl.addEventListener('error', () => {
            imgEl.style.display = 'none'; // Скрываем поломанное изображение
        });
    }
}