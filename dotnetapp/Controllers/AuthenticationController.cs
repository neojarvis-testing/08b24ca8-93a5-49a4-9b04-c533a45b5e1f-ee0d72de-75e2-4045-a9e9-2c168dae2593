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

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { status = "error", message = "Invalid payload" });
            }

            var (status, result) = await _authService.Registration(model);
            if (status == 0)
            {
                return BadRequest(new { status = "error", message = result });
            }

            return Ok(new { status = "success", message = result });
        }

        [HttpPost("verify-registration-otp")]
        public async Task<IActionResult> VerifyRegistrationOtp([FromBody] User model, [FromQuery] string otp)
        {
            var (status, result) = await _authService.VerifyAndRegister(model, otp);
            if (status == 0)
            {
                return BadRequest(new { status = "error", message = result });
            }

            return Ok(new { status = "success", message = result });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var (status, result) = await _authService.Login(model);
            if (status == 0)
            {
                return Unauthorized(new { status = "error", message = result });
            }

            return Ok(new { status = "success", token = result });
        }

        [HttpPost("verify-login-otp")]
        public async Task<IActionResult> VerifyLoginOtp([FromBody] LoginModel model, [FromQuery] string otp)
        {
            var (status, result) = await _authService.VerifyAndLogin(model, otp);
            if (status == 0)
            {
                return BadRequest(new { status = "error", message = result });
            }

            return Ok(new { status = "success", message = result });
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromQuery] string email)
        {
            var (status, result) = await _authService.ForgotPassword(email);
            if (status == 0)
            {
                return BadRequest(new { status = "error", message = result });
            }

            return Ok(new { status = "success", message = result });
        }

        [HttpPut("verify-reset-otp")]
        public async Task<IActionResult> ResetPassword([FromBody] LoginModel model, [FromQuery] string otp)
        {
            var (status, result) = await _authService.VerifyOtpResetPassword(model, otp);
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