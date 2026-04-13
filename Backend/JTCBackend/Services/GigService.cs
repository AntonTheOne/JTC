using JTCBackend.Models;
using JTCBackend.Repositories;

namespace JTCBackend.Services
{
    public class GigService
    {
        private readonly GigRepository _repository;

        public GigService(GigRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<Gig>> GetAll()
        {
            return await _repository.GetAll();
        }
    }
}