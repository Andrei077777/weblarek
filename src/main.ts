import './scss/styles.scss';

// Модели данных
import { Products } from './components/models/Products';
import { Cart } from './components/models/Cart';
import { Buyer } from './components/models/Buyer';

// Коммуникационный слой
import { Api } from './components/base/Api';
import { ApiService } from './components/base/ApiService';

// Брокер событий
import { EventEmitter } from './components/base/Events';

// Компоненты представления
import { HeaderView } from './components/views/HeaderView';
import { GalleryView } from './components/views/GalleryView';
import { Modal } from './components/views/Modal';
import { CardCatalog } from './components/views/CardCatalog';
import { CardPreview } from './components/views/CardPreview';
import { CardBasket } from './components/views/CardBasket';
import { Basket } from './components/views/Basket';
import { OrderForm } from './components/views/OrderForm';
import { ContactsForm } from './components/views/ContactsForm';
import { Success } from './components/views/Success';

import { ensureElement, cloneTemplate } from './utils/utils';
import { API_URL, CDN_URL, Events } from './utils/constants';
import { IProduct, ICardCatalog, IOrderRequest, TPayment } from './types';

/* ===================== Инициализация ===================== */

const events = new EventEmitter();

// Модели данных получают брокер событий и эмитят события при изменении данных
const productsModel = new Products(events);
const cartModel = new Cart(events);
const buyerModel = new Buyer(events);

// Слой коммуникации
const api = new Api(API_URL);
const apiService = new ApiService(api);

// Темплейты разметки
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// Постоянные компоненты представления
//const page = new Page(document.body, events);
const header = new HeaderView(document.body, events);
const gallery = new GalleryView(document.body);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const preview = new CardPreview(cloneTemplate(cardPreviewTemplate), events);
const orderForm = new OrderForm(cloneTemplate<HTMLFormElement>(orderTemplate), events);
const contactsForm = new ContactsForm(cloneTemplate<HTMLFormElement>(contactsTemplate), events);
const success = new Success(cloneTemplate(successTemplate), events);

/* ===================== Вспомогательные функции подготовки данных =====================
   Презентер отвечает за подготовку данных, которые нужны компонентам представления. */

// Данные для карточки каталога
function toCatalogCard(product: IProduct): ICardCatalog {
    return {
        id: product.id,
        title: product.title,
        category: product.category,
        image: CDN_URL + product.image,
        price: product.price,
    };
}

// Перерисовка содержимого корзины на основе данных модели
function renderBasket(): void {
    const items = cartModel.getItems().map((product, index) => {
        const card = new CardBasket(cloneTemplate(cardBasketTemplate), events,    () => {
                events.emit(Events.CARD_REMOVE, {
                    id: product.id,
                });
            });
        return card.render({
            id: product.id,
            index: index + 1,
            title: product.title,
            price: product.price,
        });
    });
    basket.render({ items, total: cartModel.getTotalPrice() });
}

// Состояние формы первого шага (валидность + текст ошибок)
function  updateOrderFormState() {
    const errors = buyerModel.validate();
    return {
        payment: buyerModel.getData().payment,
        address: buyerModel.getData().address,
        valid: !errors.payment && !errors.address,
        errors: [errors.payment, errors.address]
            .filter(Boolean)
            .join('; '),
    };
}

// Состояние формы второго шага (валидность + текст ошибок)
function getcontactsFormState() {
    const errors = buyerModel.validate();
    return {
        valid: !errors.email && !errors.phone,
        errors: [errors.email, errors.phone].filter(Boolean).join('; '),
    };
}

/* ===================== Обработчики событий Моделей данных ===================== */

// Каталог загружен/изменён — перерисовываем список карточек на главной
events.on(Events.CATALOG_CHANGED, () => {
    const cards = productsModel.getItems().map((product) => {
        const card = new CardCatalog(
            cloneTemplate(cardCatalogTemplate),
            events,
            () => {
                events.emit(Events.CARD_SELECT, {
                    id: product.id,
                });
            }
        );

        return card.render(toCatalogCard(product));
    });

    gallery.render({ catalog: cards });
});

// Выбран товар для просмотра — показываем его в модальном окне
events.on(Events.PREVIEW_CHANGED, () => {
    const product = productsModel.getSelectedProduct();
    if (!product) return;

    const inCart = cartModel.isInCart(product.id);
    const unavailable = product.price === null;
    const button = unavailable ? 'Недоступно' : inCart ? 'Удалить из корзины' : 'В корзину';

    modal.render({
        content: preview.setId(product.id).render({
            id: product.id,
            title: product.title,
            category: product.category,
            image: CDN_URL + product.image,
            price: product.price,
            description: product.description,
            button,
            buttonDisabled: unavailable,
        }),
    });
    modal.open();
});

// Изменилось содержимое корзины — обновляем счётчик и содержимое корзины
events.on(Events.CART_CHANGED, () => {
    header.render({ counter: cartModel.getCount() });
    renderBasket();
});

// Изменились данные покупателя — обновляем состояние открытой формы
events.on(Events.BUYER_CHANGED, () => {
    orderForm.render(updateOrderFormState() );
    contactsForm.render(getcontactsFormState());
});

/* ===================== Обработчики событий Представлений ===================== */

// Клик по карточке каталога — запоминаем выбранный товар в модели
events.on(Events.CARD_SELECT, (data: { id: string }) => {
    const product = productsModel.getItemById(data.id);
    if (product) productsModel.setSelectedProduct(product);
});

// Нажата кнопка покупки в карточке просмотра — добавляем или удаляем товар, закрываем окно
events.on(Events.CARD_ADD, (data: { id: string }) => {
    const product = productsModel.getItemById(data.id);
    if (!product) return;
    if (cartModel.isInCart(product.id)) cartModel.removeItem(product.id);
    else cartModel.addItem(product);
    modal.close();
});

// Нажата кнопка удаления товара в корзине — удаляем товар, окно остаётся открытым
events.on(Events.CARD_REMOVE, (data: { id: string }) => {
    cartModel.removeItem(data.id);
});

// Открытие корзины
events.on(Events.BASKET_OPEN, () => {
    modal.render({ content: basket.render() });
    modal.open();
});

// Открытие формы первого шага оформления заказа
events.on(Events.ORDER_OPEN, () => {
    modal.render({
        content: orderForm.render(updateOrderFormState()),
    });
    modal.open();
});

// Изменение полей формы первого шага
events.on(Events.ORDER_CHANGE, (data: { field: string; value: string }) => {
    if (data.field === 'payment') buyerModel.setPayment(data.value as TPayment);
    if (data.field === 'address') buyerModel.setAddress(data.value);
});

// Переход ко второй форме оформления заказа
events.on(Events.ORDER_SUBMIT, () => {
    const { email, phone } = buyerModel.getData();
    modal.render({
        content: contactsForm.render({ email, phone, ...getcontactsFormState() }),
    });
    modal.open();
});

// Изменение полей формы второго шага
events.on(Events.CONTACTS_CHANGE, (data: { field: string; value: string }) => {
    if (data.field === 'email') buyerModel.setEmail(data.value);
    if (data.field === 'phone') buyerModel.setPhone(data.value);
});

// Завершение оформления заказа — отправка на сервер
events.on(Events.CONTACTS_SUBMIT, () => {
    const total = cartModel.getTotalPrice();
    const order: IOrderRequest = {
        ...buyerModel.getData(),
        items: cartModel.getItems().map((item) => item.id),
        total,
    };

    apiService
        .sendOrder(order)
        .then((result) => {
            cartModel.clear();
            buyerModel.clear();
            modal.render({ content: success.render({ total: result.total }) });
            modal.open();
        })
        .catch((error) => console.error('Ошибка при оформлении заказа:', error));
});

// Закрытие окна успешного оформления заказа
events.on(Events.SUCCESS_CLOSE, () => {
    modal.close();
});

/* ===================== Запуск приложения ===================== */

// Начальное состояние корзины (пустая) и счётчика
renderBasket();
header.render({ counter: cartModel.getCount() });

// Запрос каталога товаров с сервера и сохранение в модель
apiService
    .getProducts()
    .then((response) => productsModel.setItems(response.items))
    .catch((error) => console.error('Ошибка при загрузке каталога товаров:', error));
