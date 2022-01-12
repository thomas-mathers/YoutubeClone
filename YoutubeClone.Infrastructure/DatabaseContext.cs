using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using YoutubeClone.Domain;

namespace YoutubeClone.Infrastructure
{
    public class DatabaseContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) {}
        public DbSet<Channel> Channels { get; set; } = null!;
        public DbSet<Comment> Comments { get; set; } = null!;
        public DbSet<Subscription> Subscriptions { get; set; } = null!;
        public DbSet<Video> Videos { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>().Property(p => p.ProfilePictureUrl).HasDefaultValue(string.Empty);

            builder.Entity<Channel>().Property(p => p.Id).ValueGeneratedNever();
            builder.Entity<Comment>().Property(p => p.Id).ValueGeneratedNever();
            builder.Entity<Subscription>().Property(p => p.Id).ValueGeneratedNever();
            builder.Entity<Video>().Property(p => p.Id).ValueGeneratedNever();

            builder.Entity<Subscription>().HasOne(p => p.Channel).WithMany(p => p.Subscriptions).OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Comment>().HasOne(p => p.Video).WithMany(p => p.Comments).OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Comment>().HasMany(p => p.Replies).WithOne(p => p.ParentComment).HasForeignKey(p => p.ParentCommentId).OnDelete(DeleteBehavior.Restrict);
        }
    }
}
