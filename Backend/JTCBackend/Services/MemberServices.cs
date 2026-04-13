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
    }
}
