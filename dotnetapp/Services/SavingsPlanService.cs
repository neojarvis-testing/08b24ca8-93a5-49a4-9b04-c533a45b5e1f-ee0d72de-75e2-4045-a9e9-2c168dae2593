using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Data;
using dotnetapp.Models;
using dotnetapp.Exceptions;

namespace dotnetapp.Services
{
    public class SavingsPlanService : ISavingsPlanService
    {
        private readonly ApplicationDbContext db;

        public SavingsPlanService(ApplicationDbContext db1)
        {
            db = db1;
        }

        public async Task<IEnumerable<SavingsPlan>> GetAllSavingsPlan()
        {
            return await db.SavingsPlans.ToListAsync();
        }

        public async Task<SavingsPlan> GetSavingsPlanById(int savingsPlanId)
        {
            return await db.SavingsPlans.FindAsync(savingsPlanId);
        }

        public async Task<bool> AddSavingsPlan(SavingsPlan savingsPlan)
        {
            if (db.SavingsPlans.Any(sp => sp.Name == savingsPlan.Name))
            {
                throw new PlanAlreadyExistsException("Plan with the same name already exists");
            }

            db.SavingsPlans.Add(savingsPlan);
            await db.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateSavingsPlan(SavingsPlan savingsPlan)
        {
            var existingPlan = await db.SavingsPlans.FindAsync(savingsPlan.SavingsPlanId);
            if (existingPlan == null)
            {
                return false;
            }

            if (existingPlan.Name != savingsPlan.Name && db.SavingsPlans.Any(sp => sp.Name == savingsPlan.Name))
            {
                throw new PlanAlreadyExistsException ("Plan with the same name already exists");
            }

            existingPlan.Name = savingsPlan.Name;
            //existingPlan.Details = savingsPlan.Details;
            await db.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteSavingsPlan(int savingsPlanId)
        {
            var savingsPlan = await db.SavingsPlans.FindAsync(savingsPlanId);
            if (savingsPlan == null)
            {
                return false;
            }

            db.SavingsPlans.Remove(savingsPlan);
            await db.SaveChangesAsync();
            return true;
        }
    }
}
