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

        public async Task<Gig?> GetById(int id)
        {
            return await _context.Gigs.FindAsync(id);
        }

        public async Task Add(Gig gig)
        {
            _context.Gigs.Add(gig);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Gig gig)
        {
            _context.Gigs.Update(gig);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Gig gig)
        {
            _context.Gigs.Remove(gig);
            await _context.SaveChangesAsync();
        }
    }
}