/* Константа для получения полного пути для сервера. Для выполнения запроса 
необходимо к API_URL добавить только ендпоинт. */
export const API_URL = `${import.meta.env.VITE_API_ORIGIN}/api/weblarek`; 

/* Константа для формирования полного пути к изображениям карточек. 
Для получения полной ссылки на картинку необходимо к CDN_URL добавить только название файла изображения,
которое хранится в объекте товара. */
export const CDN_URL = `${import.meta.env.VITE_API_ORIGIN}/content/weblarek`;

/* Константа соответствий категорий товара модификаторам, используемым для отображения фона категории. */
export const categoryMap: Record<string, string> = {
  'софт-скил': 'card__category_soft',
  'хард-скил': 'card__category_hard',
  'кнопка': 'card__category_button',
  'дополнительное': 'card__category_additional',
  'другое': 'card__category_other',
};

export const settings = {

};

/* Имена событий приложения. Вынесены в одно место, чтобы Модели, Представления
и Презентер ссылались на одинаковые строки и не возникало опечаток. */
export const Events = {
  // События Моделей данных
  CATALOG_CHANGED: 'catalog:changed',   // изменился каталог товаров
  PREVIEW_CHANGED: 'preview:changed',   // изменился товар, выбранный для просмотра
  CART_CHANGED: 'cart:changed',         // изменилось содержимое корзины
  BUYER_CHANGED: 'buyer:changed',       // изменились данные покупателя

  // События Представлений
  CARD_SELECT: 'card:select',           // выбор карточки для просмотра
  CARD_ADD: 'card:add',                 // нажатие кнопки покупки товара
  CARD_REMOVE: 'card:remove',           // нажатие кнопки удаления товара из корзины
  BASKET_OPEN: 'basket:open',           // нажатие кнопки открытия корзины
  ORDER_OPEN: 'order:open',             // нажатие кнопки оформления заказа
  ORDER_CHANGE: 'order:change',         // изменение данных в форме первого шага
  ORDER_SUBMIT: 'order:submit',         // переход ко второй форме оформления
  CONTACTS_CHANGE: 'contacts:change',   // изменение данных в форме второго шага
  CONTACTS_SUBMIT: 'contacts:submit',   // завершение оформления заказа
  MODAL_CLOSE: 'modal:close',           // закрытие модального окна
  SUCCESS_CLOSE: 'success:close',       // закрытие окна успешного заказа
} as const;

