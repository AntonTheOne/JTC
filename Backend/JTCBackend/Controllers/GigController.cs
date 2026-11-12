using JTCBackend.Models;
using JTCBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JTCBackend.Controllers
{
    [Authorize] // Allt kräver inloggning om inget annat anges
    [ApiController]
    [Route("api/[controller]")]
    public class GigController : ControllerBase
    {
        private readonly GigService _service;

        public GigController(GigService service)
        {
            _service = service;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<List<Gig>> GetAll()
        {
            return await _service.GetAll();
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Gig>> GetById(int id)
        {
            var gig = await _service.GetById(id);
            if (gig == null) return NotFound();
            return Ok(gig);
        }

        [HttpPost]
        public async Task<IActionResult> Add(Gig gig)
        {
            await _service.Add(gig);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Gig gig)
        {
            var success = await _service.Update(id, gig);
            if (!success) return NotFound();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.Delete(id);
            if (!success) return NotFound();
            return Ok();
        }
    }
}