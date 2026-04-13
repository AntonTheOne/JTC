using JTCBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JTCBackend.Repositories
{
    public class MemberRepositories
    {
        private readonly AppDbContext _context;

        public MemberRepositories(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Member>> GetMember()
        {
            return await _context.Members.ToListAsync();
        }

    }
}
