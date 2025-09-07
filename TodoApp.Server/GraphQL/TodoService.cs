using Microsoft.EntityFrameworkCore;
using TodoApp.Server.Data;
using TodoApp.Server.GraphQL.Inputs;
using TodoApp.Server.Models;

namespace TodoApp.Server.GraphQL
{
    public class TodoService
    {
        private readonly TodoDbContext _context;
        
        public TodoService(TodoDbContext context)
        {
            _context = context;
        }
        
        public async Task<IEnumerable<Models.Task>> GetAllTasksAsync()
        {
            return await _context.Tasks
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();
        }
        
        public async Task<Models.Task?> GetTaskByIdAsync(int id)
        {
            return await _context.Tasks.FindAsync(id);
        }
        
        public async Task<Models.Task> CreateTaskAsync(CreateTaskInput input)
        {
            var task = new Models.Task
            {
                Title = input.Title,
                Description = input.Description,
                Status = Models.TaskStatus.Pending,
                CreatedAt = DateTime.UtcNow
            };
            
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            
            return task;
        }
        
        public async Task<Models.Task?> UpdateTaskStatusAsync(UpdateTaskStatusInput input)
        {
            var task = await _context.Tasks.FindAsync(input.Id);
            if (task == null)
            {
                return null;
            }
            
            task.Status = input.Status;
            task.UpdatedAt = DateTime.UtcNow;
            
            await _context.SaveChangesAsync();
            
            return task;
        }
    }
}
