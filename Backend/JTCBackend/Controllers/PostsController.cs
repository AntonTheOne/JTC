using JTCBackend.Models;
using JTCBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JTCBackend.Controllers
{
    [Authorize] // Allt kräver inloggning om inget annat anges
    [ApiController]
    [Route("api/[controller]")]
    public class PostsController : ControllerBase
    {

        private readonly PostServices _services;

        public PostsController(PostServices services)
        {
            _services = services;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<List<Post>> GetPosts()
        {
            return await _services.GetPosts();
        }

        [HttpPost]
        public async Task<IActionResult> Add(Post post)
        {
            await _services.Add(post);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _services.DeletePost(id);

            if (!success)
                return NotFound();

            return NoContent();
        }

        [HttpPut]
        public async Task<IActionResult> Update(Post post)
        {
            await _services.UpdatePost(post);
            return Ok(post);
        }
    }
}
