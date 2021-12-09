using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YoutubeClone.Infrastructure.Migrations
{
    public partial class v6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Subscriptions_ChannelId",
                table: "Subscriptions",
                column: "ChannelId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Subscriptions_Channels_ChannelId",
                table: "Subscriptions",
                column: "ChannelId",
                principalTable: "Channels",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Subscriptions_Channels_ChannelId",
                table: "Subscriptions");

            migrationBuilder.DropIndex(
                name: "IX_Subscriptions_ChannelId",
                table: "Subscriptions");
        }
    }
}
