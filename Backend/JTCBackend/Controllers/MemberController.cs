using JTCBackend.Models;
using JTCBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace JTCBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MemberController : ControllerBase
    {
        private readonly MemberServices _content;

        public MemberController(MemberServices content)
        {
            _content = content;
        }

        [HttpGet]
        public async Task<List<Member>> GetMebers()
        {
            return await _content.GetMembers();
        }

    }
}
