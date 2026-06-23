export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export type TBuyerErrors = Partial<Record<keyof IBuyer, string>>;

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type TPayment = "card" | "cash";

// Интерфейс для товара
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

// Интерфейс для данных покупателя
export interface IBuyer {
  payment: TPayment | null;
  email: string;
  phone: string;
  address: string;
}

export type ApiProductsResponse = {
  total: number;
  items: IProduct[];
};

// Тип для данных заказа, которые мы отправляем на сервер
// В реальном приложении здесь может быть больше полей (id пользователя, дата и т.д.)
export type OrderRequestData = {
  buyer: IBuyer;
  // В будущем здесь будет массив товаров из корзины
  // products: IProduct[];
};

// Тип для подтверждения заказа от сервера
export type OrderConfirmation = {
  message: string;
  totalSum: number;
};

// ===== Типы слоя представления (View) =====
// Новые типы строятся на базе уже объявленных и не изменяют их.

// Данные для отрисовки главной страницы
export interface IPage {
  counter: number;        // счётчик товаров в корзине
  catalog: HTMLElement[]; // готовые DOM-элементы карточек каталога
}

// Данные карточки товара в каталоге
export interface ICardCatalog {
  id: string;
  title: string;
  category: string;
  image: string;
  price: number | null;
}

// Данные карточки товара в детальном просмотре
export interface ICardPreview extends ICardCatalog {
  description: string;
  button: string;          // текст кнопки («В корзину» / «Удалить из корзины» / «Недоступно»)
  buttonDisabled: boolean; // заблокирована ли кнопка
}

// Данные строки товара в корзине
export interface ICardBasket {
  id: string;
  index: number;
  title: string;
  price: number | null;
}

// Данные для отрисовки корзины
export interface IBasketView {
  items: HTMLElement[]; // готовые DOM-элементы строк корзины
  total: number;        // итоговая стоимость
}

// Общее состояние любой формы
export interface IFormState {
  valid: boolean;  // можно ли отправить форму
  errors: string;  // текст ошибок валидации
}

// Данные формы первого шага оформления заказа
export interface IOrderForm {
  payment: TPayment | null;
  address: string;
}

// Данные формы второго шага оформления заказа
export interface IContactsForm {
  email: string;
  phone: string;
}

// Данные экрана успешного оформления заказа
export interface ISuccess {
  total: number;
}

// Полезная нагрузка запроса на оформление заказа
// (данные покупателя + список id товаров и итоговая сумма)
export type IOrderRequest = IBuyer & {
  items: string[];
  total: number;
};