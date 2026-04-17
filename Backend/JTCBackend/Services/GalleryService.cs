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

        public async Task<GalleryImage?> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task Add(GalleryImage image)
        {
            image.CreatedAt = DateTime.Now;
            await _repository.Add(image);
        }

        public async Task<bool> Update(int id, GalleryImage updated)
        {
            var image = await _repository.GetById(id);
            if (image == null) return false;

            image.ImageUrl = updated.ImageUrl;
            image.Caption = updated.Caption;

            await _repository.Update(image);
            return true;
        }

        public async Task<bool> Delete(int id)
        {
            var image = await _repository.GetById(id);
            if (image == null) return false;

            await _repository.Delete(image);
            return true;
        }
    }
}