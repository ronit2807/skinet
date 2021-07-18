using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Dto;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseController
    {
        public readonly IOrderService OrderService;
        private readonly IMapper mapper;
        public OrdersController(IOrderService orderService, IMapper mapper)
        {
            this.mapper = mapper;
            this.OrderService = orderService;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
        {
            var email = HttpContext.User.ReturnEmailId();
            var address = mapper.Map<AddressDto,Address>(orderDto.ShipToAddress);
            var order = await OrderService.CreateOrderAsync(email,orderDto.DeliveryMethodId,orderDto.BasketId,address);
            if(order == null) return BadRequest(new ApiResponse(400,"Problem creating order"));

            return Ok(order);
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrderToReturnDto>>> GetOrdersForUser()
        {
            var email = HttpContext.User.ReturnEmailId();
            var orders = await OrderService.GetOrderForUserAsync(email);
            return Ok(mapper.Map<IReadOnlyList<Order>,IReadOnlyList<OrderToReturnDto>>(orders));   
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderToReturnDto>> GetOrderByIdForUser(int id)
        {
            var email = HttpContext.User.ReturnEmailId();
            var order = await OrderService.GetOrderById(id,email);
            if(order == null) return NotFound(new ApiResponse(404));
            return Ok(mapper.Map<Order,OrderToReturnDto>(order));
        }

        [HttpGet("deliveryMethods")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
        {
            return Ok(await OrderService.GetDeliveryMethodsAsync());
        }
    }
}