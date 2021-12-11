using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YoutubeClone.Domain;
using YoutubeClone.DTO;
using YoutubeClone.Infrastructure;
using YoutubeClone.Infrastructure.Services;
using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews(options =>
{
    options.Conventions.Add(new RouteTokenTransformerConvention(new SlugifyParameterTransformer()));
});
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

builder.Services.AddTransient<ITokenGenerator, JwtTokenGenerator>();

builder.Services.AddTransient<IMapper>(serviceProvider =>
{
    var config = new MapperConfiguration(cfg =>
    {
        cfg.CreateMap<Channel, ChannelSummary>();
        cfg.CreateMap<Channel, ChannelSummary>().ForMember(m => m.UserName, opt => opt.MapFrom(src => src.User.UserName));
        cfg.CreateMap<Channel, ChannelSummary>().ForMember(m => m.UserProfilePictureUrl, opt => opt.MapFrom(src => src.User.ProfilePictureUrl));

        cfg.CreateMap<Comment, CommentSummary>();
        cfg.CreateMap<Comment, CommentSummary>().ForMember(m => m.UserName, opt => opt.MapFrom(src => src.User.UserName));
        cfg.CreateMap<Comment, CommentSummary>().ForMember(m => m.UserProfilePictureUrl, opt => opt.MapFrom(src => src.User.ProfilePictureUrl));

        cfg.CreateMap<Subscription, SubscriptionSummary>();
        cfg.CreateMap<Subscription, SubscriptionSummary>().ForMember(m => m.UserName, opt => opt.MapFrom(src => src.User.UserName));
        cfg.CreateMap<Subscription, SubscriptionSummary>().ForMember(m => m.UserProfilePictureUrl, opt => opt.MapFrom(src => src.User.ProfilePictureUrl));
        cfg.CreateMap<Subscription, SubscriptionSummary>().ForMember(m => m.ChannelName, opt => opt.MapFrom(src => src.Channel.Name));
        cfg.CreateMap<Subscription, SubscriptionSummary>().ForMember(m => m.ChannelThumbnailUrl, opt => opt.MapFrom(src => src.Channel.ThumbnailUrl));

        cfg.CreateMap<Video, VideoSummary>();
        cfg.CreateMap<Video, VideoSummary>().ForMember(m => m.ChannelName, opt => opt.MapFrom(src => src.Channel.Name));
        cfg.CreateMap<Video, VideoSummary>().ForMember(m => m.ChannelThumbnailUrl, opt => opt.MapFrom(src => src.Channel.ThumbnailUrl));

        cfg.CreateMap<User, UserSummary>();
    });

    var mapper = new Mapper(config);

    return mapper;
});

builder.Services.AddIdentity<User, IdentityRole<Guid>>().AddEntityFrameworkStores<DatabaseContext>().AddDefaultTokenProviders();

builder.Services.AddCors(options =>
{
    options.AddPolicy("All", builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
});

builder.Services.Configure<JwtTokenGeneratorSettings>(builder.Configuration.GetSection(nameof(JwtTokenGeneratorSettings)));

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

app.UseCors("All");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();