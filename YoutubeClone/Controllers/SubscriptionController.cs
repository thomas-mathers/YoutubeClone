using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YoutubeClone.Domain;
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
        public async Task<ActionResult<Page<SubscriptionSummary>>> GetAsync(
            [FromQuery] string orderBy = nameof(Subscription.DateCreated), 
            [FromQuery] string orderDir = "ASC",
            [FromQuery] DateTime? continuationToken = null,
            [FromQuery] int take = 100)
        {
            var query = databaseContext.Subscriptions.AsQueryable();
            
            if (continuationToken != null)
            {
                query = query.Where(x => x.DateCreated > continuationToken);
            }
            
            switch (orderBy)
            {
                default:
                    query = orderDir == "ASC" ?
                        query.OrderBy(x => x.DateCreated) :
                        query.OrderByDescending(x => x.DateCreated);
                    break;
            }

            var rows = await query.Take(take).ToListAsync();

            var page = new Page<SubscriptionSummary>
            {
                ContinuationToken = rows.LastOrDefault()?.DateCreated,
                Rows = rows.Select(x => mapper.Map<SubscriptionSummary>(x)).ToList()
            };

            return Ok(page);
        }

        [Authorize]
        [ClaimsFilter]
        [HttpDelete("{subscriptionId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteAsync(Guid claimsUserId, Guid claimsRoleId, Guid subscriptionId)
        {
            var subscription = await databaseContext.Subscriptions.FindAsync(subscriptionId);

            if (subscription == null)
            {
                return NotFound();
            }

            if (subscription.UserId != claimsUserId)
            {
                return Unauthorized();
            }

            databaseContext.Subscriptions.Remove(subscription);

            await databaseContext.SaveChangesAsync();

            return Ok();
        }
    }
}
