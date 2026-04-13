using JTCBackend.Models;
using JTCBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace JTCBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GigController : ControllerBase
    {
        private readonly GigService _service;

        public GigController(GigService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<List<Gig>> GetAll()
        {
            return await _service.GetAll();
        }
    }
}