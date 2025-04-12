using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/feedback")]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService _feedbackService;
        

        public FeedbackController(IFeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
            
        }

        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetAllFeedbacks()
        {
            try
            {
                var feedbacks = await _feedbackService.GetAllFeedbacks();
                return Ok(feedbacks);
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, "An error occurred while retrieving feedbacks.");
            }
        }

        
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetFeedbacksByUserId(int userId)
        {
            try
            {
                var feedbacks = await _feedbackService.GetFeedbacksByUserId(userId);
                return Ok(feedbacks);
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, "An error occurred while retrieving feedbacks.");
            }
        }

        
        [HttpPost]
        public async Task<ActionResult> AddFeedback([FromBody] Feedback feedback)
        {
            try
            {
                if (feedback == null)
                    return BadRequest("Feedback data is required.");

                bool success = await _feedbackService.AddFeedback(feedback);
                if (success)
                    return Ok("Feedback added successfully.");

                return StatusCode(500, "Failed to add feedback.");
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, "An error occurred while adding feedback.");
            }
        }

        
        [HttpDelete("{feedbackId}")]
        public async Task<ActionResult> DeleteFeedback(int feedbackId)
        {
            try
            {
                bool success = await _feedbackService.DeleteFeedback(feedbackId);
                if (success)
                    return Ok("Feedback deleted successfully.");

                return NotFound("Cannot find any feedback.");
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, "An error occurred while deleting feedback.");
            }
        }
    }
}