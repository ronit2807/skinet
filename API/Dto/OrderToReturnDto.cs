using System;
using System.Collections.Generic;
using Core.Entities.Identity;
using Core.Entities.OrderAggregate;

namespace API.Dto
{
    public class OrderToReturnDto
    {
        public int Id { get; set; }
        
        public string BuyerEmail { get; set; }
        
        public DateTimeOffset OrderDate { get; set; }
        public Core.Entities.OrderAggregate.Address ShipToAddress { get; set; }
        
        public string DeliveryMethod { get; set; }
        public decimal ShippingPrice { get; set; }
        public IReadOnlyList<OrderItemDto> OrderItems { get; set; }
        
        public decimal Subtotals { get; set; }
        public decimal Total {get;set;}
        public string Status { get; set; }

    }
}