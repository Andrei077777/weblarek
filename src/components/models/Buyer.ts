import { IBuyer, TPayment, TBuyerErrors } from '../../types/index.ts';

export class Buyer {
  // Данные покупателя
  private data: IBuyer = {
    payment: null,
    email: '',
    phone: '',
    address: '',
  };

  // Конструктор теперь пустой, как и требовалось по ТЗ
  constructor() { }

  // Методы для изменения данных
  setData(data: Partial<IBuyer>): void {
    this.data = { ...this.data, ...data };
  }

  setPayment(payment: TPayment): void { this.data.payment = payment; }
  setEmail(email: string): void { this.data.email = email; }
  setPhone(phone: string): void { this.data.phone = phone; }
  setAddress(address: string): void { this.data.address = address; }

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