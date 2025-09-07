
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

            // Add services
            builder.Services.AddScoped<TodoService>();

            var app = builder.Build();

            app.UseDefaultFiles();
            app.MapStaticAssets();

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
