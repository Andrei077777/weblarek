import { IBuyer, TPayment, TBuyerErrors } from '../../types/index.ts';
import { IEvents } from '../base/Events';
import { Events } from '../../utils/constants';

export class Buyer {
  // Данные покупателя
  private data: IBuyer = {
    payment: null,
    email: '',
    phone: '',
    address: '',
  };

  // Модель получает брокер событий, чтобы уведомлять об изменениях данных покупателя
  constructor(protected events: IEvents) { }

  // Методы для изменения данных
  setPayment(payment: TPayment): void {
    this.data.payment = payment;
    this.events.emit(Events.BUYER_CHANGED);
  }
  setEmail(email: string): void {
    this.data.email = email;
    this.events.emit(Events.BUYER_CHANGED);
  }
  setPhone(phone: string): void {
    this.data.phone = phone;
    this.events.emit(Events.BUYER_CHANGED);
  }
  setAddress(address: string): void {
    this.data.address = address;
    this.events.emit(Events.BUYER_CHANGED);
  }

  // Метод для получения данных
  getData(): IBuyer {
    return this.data;
  }

  // Метод для очистки данных
  clear(): void {
    this.data = {
      payment: null,
      email: '',
      phone: '',
      address: '',
    };
    this.events.emit(Events.BUYER_CHANGED);
  }

  // Метод валидации с использованием нового типа TBuyerErrors
  validate(): TBuyerErrors {
    const errors: TBuyerErrors = {};

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
}
