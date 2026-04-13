using JTCBackend.Models;
using JTCBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace JTCBackend.Controllers
{
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

        [HttpPost]
        public async Task<IActionResult> Add(BookingRequest booking)
        {
            await _service.Add(booking);
            return Ok();
        }
    }
}