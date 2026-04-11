using JTCBackend.Models;
using JTCBackend.Repositories;

namespace JTCBackend.Services
{
    public class PostServices
    {
        private readonly PostRepositories _services;

        public PostServices(PostRepositories services)
        {
            _services = services;
        }

        public async Task<List<Post>> GetPosts()
        {
            return await _services.GetPosts();
        }
    }
}
