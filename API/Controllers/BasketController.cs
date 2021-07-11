using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController : BaseController
    {
        public IBasketRepository _basketRepo { get; }
        public BasketController(IBasketRepository _basketRepo)
        {
            this._basketRepo = _basketRepo;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketById(string basketId)
        {
            var basket = await _basketRepo.GetBasketAsync(basketId);
            return Ok(basket ?? new CustomerBasket(basketId));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasket basket)
        {
            var updatedBasket = await _basketRepo.UpdateBasketAsync(basket);
            return Ok(updatedBasket);
            
        }

        [HttpDelete]
        public async Task DeleteBasket(string basketId)
        {
            await _basketRepo.DeleteBasketAsync(basketId);
        }
    }
}