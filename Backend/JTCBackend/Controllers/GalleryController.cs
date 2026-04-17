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

        [HttpGet("{id}")]
        public async Task<ActionResult<GalleryImage>> GetById(int id)
        {
            var image = await _service.GetById(id);
            if (image == null) return NotFound();
            return Ok(image);
        }

        [HttpPost]
        public async Task<IActionResult> Add(GalleryImage image)
        {
            await _service.Add(image);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, GalleryImage image)
        {
            var success = await _service.Update(id, image);
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