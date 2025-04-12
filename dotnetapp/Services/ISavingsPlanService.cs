using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Services
{
    public interface ISavingsPlanService
    {
         Task<IEnumerable<SavingPlan>> GetAllSavingsPlan();
         Task<SavingPlan> GetSavingsPlanById(int savingPlanId);
         Task<bool> AddSavingsPlan(SavingsPlan savingsPlan);
         Task<bool> UpdateSavingsPlan(SavingsPlan savingsPlan);
         Task<bool> DeleteSavingsPlan(int savingsPlanId);
    }
}