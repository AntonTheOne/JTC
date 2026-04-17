using JTCBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JTCBackend.Repositories
{
    public class GalleryRepository
    {
        private readonly AppDbContext _context;

        public GalleryRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<GalleryImage>> GetAll()
        {
            return await _context.GalleryImages.ToListAsync();
        }

        public async Task<GalleryImage?> GetById(int id)
        {
            return await _context.GalleryImages.FindAsync(id);
        }

        public async Task Add(GalleryImage image)
        {
            _context.GalleryImages.Add(image);
            await _context.SaveChangesAsync();
        }

        public async Task Update(GalleryImage image)
        {
            _context.GalleryImages.Update(image);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(GalleryImage image)
        {
            _context.GalleryImages.Remove(image);
            await _context.SaveChangesAsync();
        }
    }
}