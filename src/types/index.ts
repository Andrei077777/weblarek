//export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
export const enum ApiPostMethods {
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export interface IApi {
    //get<T extends object>(uri: string): Promise<T>;
   //post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
  get<T extends object | undefined>(uri: string): Promise<T>;
  post<T extends object | void>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
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