using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Services
{
    public class AuthService : IAuthService
    {
        public async Task<(int, string)> Registeration(User model, string role)
        {

        }

        public async Task<(int, string)> Login(LoginModel model)
        {

        }

        private string GenerateToken(IEnumerable<Claim> claims)
        {

        }


    }
}