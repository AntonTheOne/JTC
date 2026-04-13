using JTCBackend;
using JTCBackend.Repositories;
using JTCBackend.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddOpenApi();


builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<PostRepositories>();
builder.Services.AddScoped<PostServices>();
builder.Services.AddScoped<MemberRepositories>();
builder.Services.AddScoped<MemberServices>();
builder.Services.AddScoped<BookingRequestRepository>();
builder.Services.AddScoped<BookingRequestService>();
builder.Services.AddScoped<GigRepository>();
builder.Services.AddScoped<GigService>();
builder.Services.AddScoped<GalleryRepository>();
builder.Services.AddScoped<GalleryService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthorization();

app.MapControllers();

app.Run();