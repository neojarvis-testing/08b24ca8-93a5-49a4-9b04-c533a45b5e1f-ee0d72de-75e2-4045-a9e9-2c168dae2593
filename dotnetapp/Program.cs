using Microsoft.EntityFrameworkCore;
using dotnetapp.Data;
using dotnetapp.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(db =>
{
    db.UseSqlServer(builder.Configuration.GetConnectionString("Myconnstring"));
});

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ISavingsPlanService, SavingsPlanService>();
builder.Services.AddScoped<IPlanApplicationService, PlanApplicationService>();
builder.Services.AddScoped<IFeedbackService, FeedbackService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
