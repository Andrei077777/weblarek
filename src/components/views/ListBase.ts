import { View } from '../base/View';

export abstract class ListBase<Item extends View<any>> extends View<Item[]> {
    protected props: Item[] = [];

    constructor(root: HTMLDivElement) {
        super(root);
    }

    // Переопределяем метод render с соблюдением сигнатуры базового класса
    override render(data?: Item[]): HTMLElement {
        // Очищаем контейнер
        this.root.innerHTML = '';

        // Если передан массив данных, используем его, иначе рендерим текущий массив
        const itemsToRender = data || this.props;

        // Рендерим каждый элемент
        itemsToRender.forEach(item => {
            this.root.appendChild(item.render());
        });

        // Возвращаем корневой элемент, как требует базовый класс
        return this.root;
    }
}