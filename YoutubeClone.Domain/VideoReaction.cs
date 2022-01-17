using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YoutubeClone.Domain
{
    public class VideoReaction
    {
        public Guid Id { get; private set; } = Guid.NewGuid();
        public Guid VideoId { get; private set; }
        public Video Video { get; private set; } = null!;
        public Guid UserId { get; private set; }
        public User User { get; private set; } = null!;
        public ReactionType ReactionType { get; private set; }
        public DateTime DateCreated { get; private set; } = DateTime.UtcNow;

        public VideoReaction(Guid videoId, Guid userId, ReactionType reactionType)
        {
            VideoId = videoId;
            UserId = userId;
            ReactionType = reactionType;
        }
    }
}
