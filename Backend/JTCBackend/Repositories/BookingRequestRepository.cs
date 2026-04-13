using JTCBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JTCBackend.Repositories
{
    public class BookingRequestRepository
    {
        private readonly AppDbContext _context;

        public BookingRequestRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<BookingRequest>> GetAll()
        {
            return await _context.BookingRequests.ToListAsync();
        }

        public async Task Add(BookingRequest booking)
        {
            _context.BookingRequests.Add(booking);
            await _context.SaveChangesAsync();
        }
    }
}