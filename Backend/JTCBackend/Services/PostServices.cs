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

        public async Task Add(Post post)
        {
            await _services.Add(post);
        }

        public async Task<bool> DeletePost(int id)
        {
            return await _services.Delete(id);
        }

        public async Task UpdatePost(Post post)
        {
            await _services.Update(post);
        }
    }
}
