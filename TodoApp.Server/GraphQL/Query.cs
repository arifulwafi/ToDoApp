using HotChocolate;
using TodoApp.Server.Models;

namespace TodoApp.Server.GraphQL
{
    public class Query
    {
        public async Task<IEnumerable<Models.Task>> GetAllTasks([Service] TodoService todoService)
        {
            return await todoService.GetAllTasksAsync();
        }
        
        public async Task<Models.Task?> GetTaskById(int id, [Service] TodoService todoService)
        {
            return await todoService.GetTaskByIdAsync(id);
        }
    }
}
