﻿namespace YoutubeClone.Domain
{
    public class Comment
    {
        private readonly HashSet<Comment> replies = new();

        public Guid Id { get; private set; } = Guid.NewGuid();
        public Guid UserId { get; private set; }
        public string Text { get; private set; }
        public long Likes { get; private set; }
        public long Dislikes { get; private set; }
        public DateTime Created { get; } = DateTime.UtcNow;
        public IEnumerable<Comment> Replies => replies;

        public Comment(Guid userId, string text)
        {
            UserId = userId;
            Text = text;
        }

        public void Like()
        {
            Likes++;
        }

        public void Dislike()
        {
            Dislikes++;
        }

        public void AddReply(Comment comment)
        {
            replies.Add(comment);
        }
    }
}