using System;
using System.ComponentModel.DataAnnotations.Schema;
using la_rive_admin.Models.Data.Enums.Order;

namespace la_rive_admin.Models
{
    [Table("Order")]
    public class Order
    {
        public string Id { get; set; }

        public string Store { get; set; }
        public string OrderNr { get; set; }
        public string OrderContent { get; set; }
        public double Amount { get; set; }
        public double RateAmount { get; set; }
        public int CountRate { get; set; }
        public DateTime Date { get; set; }
        public DateTime FirstPaymentDate { get; set; }

        public MeansOfPayment MeansOfPayment { get; set; }
        public PaymentMethode PaymentMethode { get; set; }
        public PaymentRate PaymentRate { get; set; }

        public DeliveryState DeliveryState { get; set; }
    }
}
