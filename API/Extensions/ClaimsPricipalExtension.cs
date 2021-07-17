using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace API.Extensions
{
    public static class ClaimsPricipalExtension
    {
        public static string ReturnEmailId(this ClaimsPrincipal claimsPrincipal)
        {
            var email = claimsPrincipal?.Claims?.SingleOrDefault(x=>x.Type == ClaimTypes.Email)?.Value;
            return email;
        }   
    }
}