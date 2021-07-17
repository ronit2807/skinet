using System;
using System.Collections.Generic;

namespace Core.Entities.OrderAggregate
{
    public class Order: BaseEntity
    {
        public Order()
        {
        }

        public Order(string buyerEmail, 
            Address shipToAddress, DeliveryMethod deliveryMethod, 
                        IReadOnlyList<OrderItem> orderItems, decimal subtotals)
        {
            BuyerEmail = buyerEmail;
            ShipToAddress = shipToAddress;
            DeliveryMethod = deliveryMethod;
            OrderItems = orderItems;
            Subtotals = subtotals;
        }

        public string BuyerEmail { get; set; }
        
        public DateTimeOffset OrderDate { get; set; } = DateTimeOffset.Now;
        public Address ShipToAddress { get; set; }
        
        public DeliveryMethod DeliveryMethod { get; set; }
        public IReadOnlyList<OrderItem> OrderItems { get; set; }
        
        public decimal Subtotals { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        public string PaymentIntentId { get; set; }   

        public decimal GetTotal(){
            return Subtotals+DeliveryMethod.Price;
        }
        
    }
}