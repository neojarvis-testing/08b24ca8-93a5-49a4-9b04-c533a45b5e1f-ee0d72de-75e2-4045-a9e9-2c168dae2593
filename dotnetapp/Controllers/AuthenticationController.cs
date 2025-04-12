using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        public async Task<IActionResult> Login(LoginModel model)
        {

        }

        public async Task<IActionResult> Register(User model)
        {
            
        }
    }
}