using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlanApplicationController : ControllerBase
    {
       
       private readonly IPlanApplicationService _planApplicationService;

       public PlanApplicationController(IPlanApplicationService planApplicationService)
       {
        _planApplicationService=planApplicationService;
       }
        
     
     
      
    }
}