// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using System.Security.Claims;
// using System.IdentityModel.Tokens.Jwt;
// using System.Text;
// using Microsoft.IdentityModel.Tokens;
// using dotnetapp.Models;
// using dotnetapp.Data;


// namespace dotnetapp.Services
// {
//     public class AuthService : IAuthService
//     {
//         // private readonly IConfiguration _configuration;
//         // private readonly UserManager<User> _userManager;

//         // public AuthService(IConfiguration configuration, UserRoles<User> userManager)
//         // {
//         //     _configuration = configuration;
//         //     _userManager = userManager;
//         // }

//         public async Task<(int, string)> Registration(User model, string role)
//         {
//             // var userExists = await _userManager.FindByEmailAsync(model.Email);
//             // if (userExists != null)
//             // {
//             //     return (0, "User already exists");
//             // }

//             // var result = await _userManager.CreateAsync(model, model.Password);
//             // if (!result.Succeeded)
//             // {
//             //     return (0, "User creation failed");
//             // }

//             // await _userManager.AddToRoleAsync(model, role);
//             // return (1, "User created successfully");
//         }

//         public async Task<(int, string)> Login(LoginModel model)
//         {
//             // var user = await _userManager.FindByEmailAsync(model.Email);
//             // if (user == null)
//             // {
//             //     return (0, "Invalid email");
//             // }

//             // var isPasswordValid = await _userManager.CheckPasswordAsync(user, model.Password);
//             // if (!isPasswordValid)
//             // {
//             //     return (0, "Invalid password");
//             // }

//             // var userClaims = await _userManager.GetClaimsAsync(user);
//             // string token = GenerateToken(userClaims);
//             // return (1, token);
//         }

//         private string GenerateToken(IEnumerable<Claim> claims)
//         {
//             // var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
//             // var token = new JwtSecurityToken(
//             //     issuer: _configuration["JWT:ValidIssuer"],
//             //     audience: _configuration["JWT:ValidAudience"],
//             //     expires: DateTime.Now.AddHours(1),
//             //     claims: claims,
//             //     signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
//             // );

//             // return new JwtSecurityTokenHandler().WriteToken(token);
//         }
//     }
// }
