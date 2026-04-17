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

        public async Task<Gig?> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task Add(Gig gig)
        {
            await _repository.Add(gig);
        }

        public async Task<bool> Update(int id, Gig updated)
        {
            var gig = await _repository.GetById(id);
            if (gig == null) return false;

            gig.Venue = updated.Venue;
            gig.City = updated.City;
            gig.Date = updated.Date;
            gig.TicketUrl = updated.TicketUrl;

            await _repository.Update(gig);
            return true;
        }

        public async Task<bool> Delete(int id)
        {
            var gig = await _repository.GetById(id);
            if (gig == null) return false;

            await _repository.Delete(gig);
            return true;
        }
    }
}