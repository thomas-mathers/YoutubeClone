using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;

namespace YoutubeClone
{
    public class ClaimsFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var claimsIdentity = context.HttpContext.User.Identity as ClaimsIdentity;

            var userId = claimsIdentity?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentException(userId, nameof(userId));
            }

            var roleId = claimsIdentity?.FindFirst(ClaimTypes.Role)?.Value;

            if (string.IsNullOrEmpty(roleId))
            {
                throw new ArgumentException(roleId, nameof(roleId));
            }

            context.ActionArguments["claimsUserId"] = Guid.Parse(userId);
            context.ActionArguments["claimsRoleId"] = Guid.Parse(roleId);
        }
    }
}
