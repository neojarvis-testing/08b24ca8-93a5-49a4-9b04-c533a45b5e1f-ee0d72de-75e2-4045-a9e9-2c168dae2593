using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;
using dotnetapp.Data;
using Microsoft.Extensions.Configuration;
using System.Net;
using System.Net.Mail;

namespace dotnetapp.Services
{
    public class OtpService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public OtpService(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<string> GenerateOtpAsync(string email)
        {
            // Check for existing OTPs for the email and remove them
            var existingOtps = _context.Otp.Where(o => o.Email == email);
            if (existingOtps.Any())
            {
                _context.Otp.RemoveRange(existingOtps);
                await _context.SaveChangesAsync();
            }

            var otp = new Random().Next(100000, 999999).ToString();
            var expiryTime = DateTime.UtcNow.AddMinutes(3);

            var otpModel = new OtpModel
            {
                Email = email,
                Otp = otp,
                ExpiryTime = expiryTime
            };

            _context.Otp.Add(otpModel);
            await _context.SaveChangesAsync();

            return otp;
        }

        public async Task<bool> ValidateOtpAsync(string email, string otp)
        {
            var otpEntry = await _context.Otp.FirstOrDefaultAsync(o => o.Email == email && o.Otp == otp);
            Console.WriteLine(otpEntry);
            if (otpEntry != null && otpEntry.ExpiryTime > DateTime.UtcNow)
            {
                _context.Otp.Remove(otpEntry); // Remove OTP after validation
                await _context.SaveChangesAsync();
                await Task.Delay(10);
                return true;
            }
            return false;
        }

        public async Task SendOtpEmailAsync(string email, string otp)
        {
            var smtpHost = _configuration["Smtp:Host"];
            var smtpPort = int.Parse(_configuration["Smtp:Port"]);
            var smtpEmail = _configuration["Smtp:Email"];
            var smtpPassword = _configuration["Smtp:Password"];

            using var smtpClient = new SmtpClient(smtpHost, smtpPort)
            {
                Credentials = new System.Net.NetworkCredential(smtpEmail, smtpPassword),
                EnableSsl = true
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(smtpEmail),
                Subject = "Your OTP Code",
                Body = $"Your OTP is {otp}. It will expire in 3 minutes.",
                IsBodyHtml = false
            };
            mailMessage.To.Add(email);

            smtpClient.Send(mailMessage);

            await Task.Delay(10);
        }
    }
}