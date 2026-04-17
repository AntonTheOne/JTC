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

        public async Task<Member?> GetById(int id)
        {
            return await _context.Members.FindAsync(id);
        }

        public async Task Add(Member member)
        {
            _context.Members.Add(member);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Member member)
        {
            _context.Members.Update(member);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Member member)
        {
            _context.Members.Remove(member);
            await _context.SaveChangesAsync();
        }
    }
}