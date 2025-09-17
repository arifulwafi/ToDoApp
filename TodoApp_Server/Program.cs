
using Microsoft.EntityFrameworkCore;
using TodoApp.Server.Data;
using TodoApp.Server.GraphQL;
using TodoApp.Server.GraphQL.Inputs;
using TodoApp.Server.GraphQL.Types;

namespace TodoApp.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            // Add Entity Framework
            builder.Services.AddDbContext<TodoDbContext>(options =>
                options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=todo.db"));

            // Add GraphQL
            builder.Services
                .AddGraphQLServer()
                .AddQueryType<Query>()
                .AddMutationType<Mutation>()
                .AddType<TaskType>()
                .AddType<TaskStatusType>()
                .AddType<CreateTaskInputType>()
                .AddType<UpdateTaskStatusInputType>();

            // CORS - allow your dev frontend origin(s)
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowLocalDev", policy =>
                {
                    policy
                      .WithOrigins("https://localhost:60221", "https://localhost:7217", "http://localhost:3000")
                      .AllowAnyHeader()
                      .AllowAnyMethod()
                      .AllowCredentials(); // include only if you need cookies; otherwise remove
                });
            });

            // Add services
            builder.Services.AddScoped<TodoService>();

            var app = builder.Build();

            app.UseDefaultFiles();
            app.MapStaticAssets();
            app.UseCors("AllowLocalDev");

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            // Map GraphQL endpoint
            app.MapGraphQL();

            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            // Initialize database
            using (var scope = app.Services.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<TodoDbContext>();
                context.Database.EnsureCreated();
            }

            app.Run();
        }
    }
}
