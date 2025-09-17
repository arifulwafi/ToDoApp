using HotChocolate;
using TodoApp.Server.GraphQL.Inputs;
using TodoApp.Server.Models;

namespace TodoApp.Server.GraphQL
{
    public class Mutation
    {
        public async Task<Models.Task> CreateTask(CreateTaskInput input, [Service] TodoService todoService)
        {
            return await todoService.CreateTaskAsync(input);
        }
        
        public async Task<Models.Task?> UpdateTaskStatus(UpdateTaskStatusInput input, [Service] TodoService todoService)
        {
            return await todoService.UpdateTaskStatusAsync(input);
        }
    }
}
