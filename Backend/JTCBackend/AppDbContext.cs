using JTCBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JTCBackend
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Post> Posts { get; set; }
        public DbSet<Gig> Gigs { get; set; }
        public DbSet<Member> Members { get; set; }
        public DbSet<BookingRequest> BookingRequests { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<GalleryImage> GalleryImages { get; set; }
    }
}