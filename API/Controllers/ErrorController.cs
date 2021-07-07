using API.Errors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("error/{code}")]
    public class ErrorController:BaseController
    {
        [HttpGet]
        public ActionResult Error(int code)
        {
            return new ObjectResult(new ApiResponse(code));
        }
        
    }
}