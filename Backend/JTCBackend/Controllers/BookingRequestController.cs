using JTCBackend.Models;
using JTCBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using JTCBackend.DTOs;

namespace JTCBackend.Controllers
{
    [Authorize] // Allt kräver inloggning om inget annat anges
    [ApiController]
    [Route("api/[controller]")]
    public class BookingRequestController : ControllerBase
    {
        private readonly BookingRequestService _service;

        public BookingRequestController(BookingRequestService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<List<BookingRequest>> GetAll()
        {
            return await _service.GetAll();
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Add(BookingRequest booking)
        {
            await _service.Add(booking);
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BookingRequest>> GetById(int id)
        {
            var booking = await _service.GetById(id);
            if (booking == null) return NotFound();
            return Ok(booking);
        }

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateStatusDto dto)
        {
            await _service.UpdateStatus(id, dto.Status, dto.AdminResponse);
            return Ok();
        }
    }
}