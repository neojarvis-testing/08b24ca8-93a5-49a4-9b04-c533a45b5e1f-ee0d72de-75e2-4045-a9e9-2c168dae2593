using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
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
            model.UserRole = userRole;

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
            string token = GenerateToken(user);
            return (1, token);
        }

        public async Task<User> GetUserById(int UserId)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.UserId == UserId);
        }



        private string GenerateToken(User user)
        {
            // Retrieve secret key and validate
            var secretKey = _configuration["JWT:SecretKey"];
            if (string.IsNullOrEmpty(secretKey))
            {
                throw new InvalidOperationException("JWT secret key is not configured.");
            }

            // Retrieve issuer and audience from configuration and validate
            var issuer = _configuration["JWT:ValidIssuer"];
            var audience = _configuration["JWT:ValidAudience"];
            if (string.IsNullOrEmpty(issuer))
            {
                throw new InvalidOperationException("JWT issuer is not configured.");
            }
            if (string.IsNullOrEmpty(audience))
            {
                throw new InvalidOperationException("JWT audience is not configured.");
            }

            // Create signing credentials
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Define claims (use custom names instead of default URIs)
            var claims = new List<Claim>
            {
                new Claim("userId", user.UserId.ToString()), // Custom claim for userId
                new Claim("userName", user.Username),        // Custom claim for username
                new Claim("email", user.Email),             // Custom claim for email
                new Claim("role", user.UserRole)            // Custom claim for role
            };

            // Generate token
            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                expires: DateTime.UtcNow.AddHours(1), // Token expiration time
                claims: claims,
                signingCredentials: signingCredentials
            );

            // Return serialized token
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string HashPassword(string password)
        {
            using (var sha256 = System.Security.Cryptography.SHA256.Create())
            {
                var bytes = Encoding.UTF8.GetBytes(password);
                var hash = sha256.ComputeHash(bytes);
                return Convert.ToBase64String(hash);
            }
        }

    
    }
}