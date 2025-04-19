using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OtpController : ControllerBase
    {
        private readonly OtpService _otpService;
        private readonly List<User> _users = new(); // Simulating a database

        public OtpController(OtpService otpService)
        {
            _otpService = otpService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (_users.Exists(u => u.Email == user.Email))
                return BadRequest("User already exists.");

            _users.Add(user); // Add user to simulated database
            var otp = await _otpService.GenerateOtpAsync(user.Email);
            await _otpService.SendOtpEmailAsync(user.Email, otp);
            return Ok("User registered. Please verify your email with the OTP.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            var user = _users.Find(u => u.Email == loginModel.Email && u.Password == loginModel.Password);
            if (user == null)
                return Unauthorized("Invalid email or password.");

            var otp = await _otpService.GenerateOtpAsync(loginModel.Email);
            await _otpService.SendOtpEmailAsync(loginModel.Email, otp);
            return Ok("Login successful. Please verify your email with the OTP.");
        }

        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtp([FromBody] string Email, string Otp)
        {
            var isValid = await _otpService.ValidateOtpAsync(Email, Otp);
            if (isValid)
                return Ok("OTP verified successfully.");

            return BadRequest("Invalid or expired OTP.");
        }
    }
}