using JTCBackend.Models;
using JTCBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace JTCBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostsController : ControllerBase
    {
     
        private readonly PostServices _services;

        public PostsController(PostServices services)
        {
            _services = services;
        }

        [HttpGet]
        public async Task<List<Post>> GetPosts()
        {
            return await _services.GetPosts();
        }
    }
}
