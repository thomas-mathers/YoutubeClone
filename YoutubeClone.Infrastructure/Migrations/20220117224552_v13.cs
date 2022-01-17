using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YoutubeClone.Infrastructure.Migrations
{
    public partial class v13 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Dislikes",
                table: "Videos");

            migrationBuilder.DropColumn(
                name: "Likes",
                table: "Videos");

            migrationBuilder.DropColumn(
                name: "Dislikes",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "Likes",
                table: "Comments");

            migrationBuilder.CreateTable(
                name: "CommentReaction",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CommentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ReactionType = table.Column<int>(type: "int", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommentReaction", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CommentReaction_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CommentReaction_Comments_CommentId",
                        column: x => x.CommentId,
                        principalTable: "Comments",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "VideoReaction",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    VideoId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ReactionType = table.Column<int>(type: "int", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VideoReaction", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VideoReaction_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VideoReaction_Videos_VideoId",
                        column: x => x.VideoId,
                        principalTable: "Videos",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_CommentReaction_CommentId_UserId",
                table: "CommentReaction",
                columns: new[] { "CommentId", "UserId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CommentReaction_UserId",
                table: "CommentReaction",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_VideoReaction_UserId",
                table: "VideoReaction",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_VideoReaction_VideoId_UserId",
                table: "VideoReaction",
                columns: new[] { "VideoId", "UserId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CommentReaction");

            migrationBuilder.DropTable(
                name: "VideoReaction");

            migrationBuilder.AddColumn<long>(
                name: "Dislikes",
                table: "Videos",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "Likes",
                table: "Videos",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "Dislikes",
                table: "Comments",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "Likes",
                table: "Comments",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }
    }
}
