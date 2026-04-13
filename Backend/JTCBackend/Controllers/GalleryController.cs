using JTCBackend.Models;
using JTCBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace JTCBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GalleryController : ControllerBase
    {
        private readonly GalleryService _service;

        public GalleryController(GalleryService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<List<GalleryImage>> GetAll()
        {
            return await _service.GetAll();
        }
    }
}