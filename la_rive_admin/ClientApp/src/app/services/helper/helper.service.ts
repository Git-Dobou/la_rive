import { Injectable } from '@angular/core';
import { MeansOfPayment, PaymentMethode } from '../../models/order';

@Injectable()
export class HelperService {

  getMeansOfPaymentText(meansOfPayment: MeansOfPayment): string {
    if (meansOfPayment == MeansOfPayment.Paypal) {
      return 'Paypal';
    }
    if (meansOfPayment == MeansOfPayment.Klarna) {
      return 'Klarna';
    }
    if (meansOfPayment == MeansOfPayment.Visa) {
      return 'Visa';
    }
    if (meansOfPayment == MeansOfPayment.AfterPay) {
      return 'AfterPay';
    }
    if (meansOfPayment == MeansOfPayment.MasterCard) {
      return 'MasterCard';
    }
    if (meansOfPayment == MeansOfPayment.Transfer) {
      return 'Transfer';
    }
    else {
      return 'Cash';
    }
  }

  getPaymentMethodeText(paymentMethod: PaymentMethode): string {
    if (paymentMethod == PaymentMethode.Total) {
      return 'Totalité';
    }
    else {
      return 'En tranche';
    }
  }
}
