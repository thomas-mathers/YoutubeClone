using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YoutubeClone.DTO;
using YoutubeClone.Infrastructure;

namespace YoutubeClone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        private readonly DatabaseContext databaseContext;
        private readonly IMapper mapper;

        public SubscriptionController(DatabaseContext databaseContext, IMapper mapper)
        {
            this.databaseContext = databaseContext;
            this.mapper = mapper;
        }

        [HttpGet]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<SubscriptionSummary>>> GetAsync()
        {
            var subscriptions = await databaseContext.Subscriptions.ToListAsync();
            var subscriptionSummarys = subscriptions.Select(x => mapper.Map<SubscriptionSummary>(x)).ToList();
            return Ok(subscriptionSummarys);
        }

        [HttpDelete("{subscriptionId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteAsync(Guid subscriptionId)
        {
            var subscription = await databaseContext.Subscriptions.FindAsync(subscriptionId);

            if (subscription == null)
            {
                return NotFound();
            }

            databaseContext.Subscriptions.Remove(subscription);

            await databaseContext.SaveChangesAsync();

            return Ok();
        }
    }
}
