using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;
using dotnetapp.Data;

namespace dotnetapp.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;

        public AuthService(IConfiguration configuration, ApplicationDbContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        public async Task<(int, string)> Registration(User model, string userRole)
        {
            // Check if user already exists
            if (await _context.Users.AnyAsync(u => u.Email == model.Email))
            {
                return (0, "User already exists");
            }

            // Hash password using SHA256
            model.Password = HashPassword(model.Password);
            model.UserRole = userRole; // Changed from Role to UserRole

            // Add user to database
            _context.Users.Add(model);
            await _context.SaveChangesAsync();

            return (1, "User created successfully");
        }

        public async Task<(int, string)> Login(LoginModel model)
        {
            // Find user by email
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
            if (user == null)
            {
                return (0, "Invalid email");
            }

            // Validate password
            if (user.Password != HashPassword(model.Password))
            {
                return (0, "Invalid password");
            }

            // Generate JWT token
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.Role, user.UserRole) // Changed from Role to UserRole
            };

            string token = GenerateToken(claims);
            return (1, token);
        }

        private string GenerateToken(IEnumerable<Claim> claims)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(1),
                claims: claims,
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var bytes = Encoding.UTF8.GetBytes(password);
                var hash = sha256.ComputeHash(bytes);
                return Convert.ToBase64String(hash);
            }
        }
    }
}