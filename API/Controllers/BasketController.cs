using System.Threading.Tasks;
using API.Dto;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController : BaseController
    {
        public IBasketRepository _basketRepo { get; }
        public IMapper Mapper { get; }
        public BasketController(IBasketRepository _basketRepo, IMapper mapper)
        {
            this.Mapper = mapper;
            this._basketRepo = _basketRepo;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketById(string basketId)
        {
            var basket = await _basketRepo.GetBasketAsync(basketId);
            return Ok(basket ?? new CustomerBasket(basketId));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasketDto basket)
        {
            var basketDto = Mapper.Map<CustomerBasketDto,CustomerBasket>(basket);
            var updatedBasket = await _basketRepo.UpdateBasketAsync(basketDto);
            return Ok(updatedBasket);

        }

        [HttpDelete]
        public async Task DeleteBasket(string basketId)
        {
            await _basketRepo.DeleteBasketAsync(basketId);
        }
    }
}