import { IBuyer, TPayment } from '../../types/index.ts';
import { IApi, ApiPostMethods } from '../../types/index.ts'; // Импортируем интерфейс API

export class Buyer {
  private data: IBuyer = {
    payment: null,
    email: '',
    phone: '',
    address: '',
  };

  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  setData(data: Partial<IBuyer>): void {
    this.data = { ...this.data, ...data };
  }

  setPayment(payment: TPayment): void { this.data.payment = payment; }
  setEmail(email: string): void { this.data.email = email; }
  setPhone(phone: string): void { this.data.phone = phone; }
  setAddress(address: string): void { this.data.address = address; }

  getData(): IBuyer {
    return this.data;
  }

  clear(): void {
    this.data = {
      payment: null,
      email: '',
      phone: '',
      address: '',
    };
  }

  validate(): { [key in keyof IBuyer]?: string } {
    const errors: { [key in keyof IBuyer]?: string } = {};

    if (!this.data.payment) {
      errors.payment = 'Не выбран вид оплаты';
    }
    if (!this.data.address.trim()) {
      errors.address = 'Введите адрес доставки';
    }
    if (!this.data.email.trim()) {
      errors.email = 'Укажите емэйл';
    }
    if (!this.data.phone.trim()) {
      errors.phone = 'Укажите телефон';
    }

    return errors;
  }

  // Метод для отправки данных покупателя на сервер (например, при оформлении заказа)
  async submitOrder(): Promise<void> {
    await this.api.post<void>('/order', this.data, ApiPostMethods.POST);
    // После успешной отправки можно очистить данные покупателя
    this.clear();
  }
}
