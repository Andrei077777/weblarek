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