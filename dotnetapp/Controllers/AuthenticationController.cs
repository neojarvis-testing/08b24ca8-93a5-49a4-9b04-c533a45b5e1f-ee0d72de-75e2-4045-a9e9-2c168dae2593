using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Authorization;


namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthenticationController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid payload");
            }

            var (status, result) = await _authService.Login(model);
            if (status == 0)
            {
                return Unauthorized(result);
            }

            return Ok(new { token = result });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { status = "error", message = "Invalid payload" });
            }

            var (status, result) = await _authService.Registration(model, model.UserRole);
            if (status == 0)
            {
                return BadRequest(new { status = "error", message = result });
            }

            return Ok(new { status = "success", message = result });
        }

        [HttpGet("Users/{userId}")]
        [Authorize(Roles = "RegionalManager")]
        public async Task<IActionResult> GetUserById(int userId)
        {
            try
            {
                var user = await _authService.GetUserById(userId);

                if (user == null)
                {
                    return NotFound(new { message = $"User with ID {userId} was not found." });
                }

                return Ok(user); // Return the user object directly
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }
        }
    }
}