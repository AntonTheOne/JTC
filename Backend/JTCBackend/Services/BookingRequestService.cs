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

        public async Task<BookingRequest?> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task UpdateStatus(int id, string status, string? adminResponse = null)
        {
            var booking = await _repository.GetById(id);
            if (booking == null) return;

            booking.Status = status;
            if (adminResponse != null)
                booking.AdminResponse = adminResponse;

            await _repository.UpdateStatus(booking);
        }
    }
}