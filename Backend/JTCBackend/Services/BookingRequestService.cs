using JTCBackend.Models;
using JTCBackend.Repositories;

namespace JTCBackend.Services
{
    public class BookingRequestService
    {
        private readonly BookingRequestRepository _repository;

        public BookingRequestService(BookingRequestRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<BookingRequest>> GetAll()
        {
            return await _repository.GetAll();
        }

        public async Task Add(BookingRequest booking)
        {
            booking.CreatedAt = DateTime.Now;
            booking.Status = "Pending";
            await _repository.Add(booking);
        }
    }
}