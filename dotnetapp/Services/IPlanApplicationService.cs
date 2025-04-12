using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Services
{
    public interface IPlanApplicationService
    {
        Task<IEnumerable<PlanApplication>> GetAllPlanApplications();

        Task<PlanApplication> GetPlanApplicationById(int planApplicationId);

        Task<bool> AddPlanApplication(PlanApplication planApplication);

        Task<IEnumerable<PlanApplication>> GetPlanApplicationsByUserId(int userId);

        Task<bool> UpdatePlanApplication(int planApplicationId, PlanApplication planApplication);

         Task<bool> DeletePlanApplication(int planApplicationId);

    }
}