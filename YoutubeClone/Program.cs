using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YoutubeClone.Domain;
using YoutubeClone.DTO;
using YoutubeClone.Infrastructure;
using YoutubeClone.Infrastructure.Services;
using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DatabaseContext>(
    options => options.UseSqlServer(
        builder.Configuration.GetConnectionString("AzureSqlServer"), 
            x => x.MigrationsAssembly("YoutubeClone.Infrastructure")));

builder.Services.AddTransient<IFileService, AzureBlobFileService>(serviceProvider =>
{
    var storageConnectionString = builder.Configuration.GetConnectionString("AzureStorage");
    var blobContainerName = builder.Configuration["AzureStorageBlobContainerName"];
    var blobContainerClient = new BlobContainerClient(storageConnectionString, blobContainerName);
    var blobFileService = new AzureBlobFileService(blobContainerClient);

    return blobFileService;
});

builder.Services.Configure<JwtTokenGeneratorSettings>(builder.Configuration.GetSection(nameof(JwtTokenGeneratorSettings)));
builder.Services.AddTransient<ITokenGenerator, JwtTokenGenerator>();

builder.Services.AddTransient<IMapper>(serviceProvider =>
{
    var config = new MapperConfiguration(cfg =>
    {
        cfg.CreateMap<Channel, ChannelSummary>();
        cfg.CreateMap<Comment, CommentSummary>();
        cfg.CreateMap<Subscription, SubscriptionSummary>();
        cfg.CreateMap<Video, VideoSummary>();
        cfg.CreateMap<User, UserSummary>();
    });

    var mapper = new Mapper(config);

    return mapper;
});

builder.Services.AddIdentity<User, IdentityRole<Guid>>().AddEntityFrameworkStores<DatabaseContext>().AddDefaultTokenProviders();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();