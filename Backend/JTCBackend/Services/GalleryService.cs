using JTCBackend.Models;
using JTCBackend.Repositories;

namespace JTCBackend.Services
{
    public class GalleryService
    {
        private readonly GalleryRepository _repository;

        public GalleryService(GalleryRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<GalleryImage>> GetAll()
        {
            return await _repository.GetAll();
        }
    }
}