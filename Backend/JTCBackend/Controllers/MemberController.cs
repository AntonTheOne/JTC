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

        [HttpGet("{id}")]
        public async Task<ActionResult<Member>> GetById(int id)
        {
            var member = await _content.GetById(id);
            if (member == null) return NotFound();
            return Ok(member);
        }

        [HttpPost]
        public async Task<IActionResult> Add(Member member)
        {
            await _content.Add(member);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Member member)
        {
            var success = await _content.Update(id, member);
            if (!success) return NotFound();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _content.Delete(id);
            if (!success) return NotFound();
            return Ok();
        }
    }
}