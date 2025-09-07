using HotChocolate;
using HotChocolate.Types;
using TodoApp.Server.Models;

namespace TodoApp.Server.GraphQL.Queries
{
    [ExtendObjectType(typeof(Query))]
    public class TodoQueries
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
