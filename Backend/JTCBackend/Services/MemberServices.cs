using JTCBackend.Models;
using JTCBackend.Repositories;

namespace JTCBackend.Services
{
    public class MemberServices
    {
        private readonly MemberRepositories _context;

        public MemberServices(MemberRepositories context)
        {
            _context = context;
        }

        public async Task<List<Member>> GetMembers()
        {
            return await _context.GetMember();
        }

        public async Task<Member?> GetById(int id)
        {
            return await _context.GetById(id);
        }

        public async Task Add(Member member)
        {
            await _context.Add(member);
        }

        public async Task<bool> Update(int id, Member updated)
        {
            var member = await _context.GetById(id);
            if (member == null) return false;

            member.Name = updated.Name;
            member.Role = updated.Role;
            member.Bio = updated.Bio;
            member.ImageUrl = updated.ImageUrl;

            await _context.Update(member);
            return true;
        }

        public async Task<bool> Delete(int id)
        {
            var member = await _context.GetById(id);
            if (member == null) return false;

            await _context.Delete(member);
            return true;
        }
    }
}