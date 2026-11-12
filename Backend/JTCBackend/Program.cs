using JTCBackend;
using JTCBackend.Repositories;
using JTCBackend.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;


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

// JWT-konfiguration
// Nyckeln ligger inte i appsettings.json. Sätt den med user-secrets lokalt
// eller miljövariabeln Jwt__Key i produktion (se README).
var jwtKey = builder.Configuration["Jwt:Key"];
if (string.IsNullOrWhiteSpace(jwtKey) || Encoding.UTF8.GetByteCount(jwtKey) < 32)
{
    throw new InvalidOperationException(
        "Jwt:Key saknas eller är kortare än 32 tecken. Kör: dotnet user-secrets set \"Jwt:Key\" \"<minst 32 slumpmässiga tecken>\"");
}
var jwtIssuer = builder.Configuration["Jwt:Issuer"];
var jwtAudience = builder.Configuration["Jwt:Audience"];

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey!))
        };
    });


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthentication(); // Måste vara före UseAuthorization!
app.UseAuthorization();

app.MapControllers();

app.Run();