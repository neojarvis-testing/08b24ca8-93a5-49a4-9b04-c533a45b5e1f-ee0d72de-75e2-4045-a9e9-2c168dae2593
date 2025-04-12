using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Services;
using dotnetapp.Models;
using dotnetapp.Services;
using dotnetapp.Exceptions;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SavingsPlanController : ControllerBase
    {
        private readonly ISavingsPlanService _savingsPlanService;

        public SavingsPlanController(ISavingsPlanService savingsPlanService)
        {
            _savingsPlanService = savingsPlanService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SavingsPlan>>> GetAllSavingsPlan()
        {
            var savingsPlans = await _savingsPlanService.GetAllSavingsPlans();
            return Ok(savingsPlans);
        }

        [HttpGet("{savingsPlanId}")]
        public async Task<ActionResult<SavingsPlan>> GetSavingsPlanById(int savingsPlanId)
        {
            var savingsPlan = await _savingsPlanService.GetSavingsPlanById(savingsPlanId);
            if (savingsPlan == null)
            {
                return NotFound(new { message = "Cannot find any savings plan" });
            }
            return Ok(savingsPlan);
        }

        [HttpPost]
        public async Task<ActionResult> AddSavingsPlan([FromBody] SavingsPlan savingsPlan)
        {
            try
            {
                await _savingsPlanService.AddSavingsPlan(savingsPlan);
                return Ok(new { message = "Savings plan successfully created" });
            }
            catch (PlanAlreadyExistsException ex)
            {
                return Conflict(new { message = ex.Message });
            }
            catch
            {
                return StatusCode(500, new { message = "An error occurred while adding the savings plan" });
            }
        }

        [HttpPut("{savingsPlanId}")]
        public async Task<ActionResult> UpdateSavingsPlan(int savingsPlanId, [FromBody] SavingsPlan savingsPlan)
        {
            if (savingsPlanId != savingsPlan.SavingsPlanId)
            {
                return BadRequest(new { message = "SavingsPlanId mismatch" });
            }

            try
            {
                var result = await _savingsPlanService.UpdateSavingsPlan(savingsPlan);
                if (!result)
                {
                    return NotFound(new { message = "Cannot find any savings plan" });
                }
                return Ok(new { message = "Savings plan successfully updated" });
            }
            catch (PlanAlreadyExistsException ex)
            {
                return Conflict(new { message = ex.Message });
            }
            catch
            {
                return StatusCode(500, new { message = "An error occurred while updating the savings plan" });
            }
        }

        [HttpDelete("{savingsPlanId}")]
        public async Task<ActionResult> DeleteSavingsPlan(int savingsPlanId)
        {
            try
            {
                var result = await _savingsPlanService.DeleteSavingsPlan(savingsPlanId);
                if (!result)
                {
                    return NotFound(new { message = "Cannot find any savings plan" });
                }
                return Ok(new { message = "Savings plan successfully deleted" });
            }
            catch
            {
                return StatusCode(500, new { message = "An error occurred while deleting the savings plan" });
            }
        }
    }
}
