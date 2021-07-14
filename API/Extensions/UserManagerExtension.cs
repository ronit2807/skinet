using System.Security.Claims;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class UserManagerExtension
    {
        public static async Task<AppUser> FindByUserByClaimsPricipleWIthAddressAsync(this UserManager<AppUser> userManager,ClaimsPrincipal User)
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            return await userManager.Users.Include(x=>x.Address).SingleOrDefaultAsync(x=>x.Email == email);
        }

        public static async Task<AppUser> FindByEmailFromClaimsPriniciple(this UserManager<AppUser> userManager,ClaimsPrincipal User)
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            return await userManager.Users.SingleOrDefaultAsync(x=>x.Email == email);
        }
    }
}