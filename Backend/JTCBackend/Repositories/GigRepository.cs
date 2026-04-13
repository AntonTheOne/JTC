using JTCBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JTCBackend.Repositories
{
    public class GigRepository
    {
        private readonly AppDbContext _context;

        public GigRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Gig>> GetAll()
        {
            return await _context.Gigs.ToListAsync();
        }
    }
}