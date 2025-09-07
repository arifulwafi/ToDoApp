using HotChocolate;
using HotChocolate.Types;
using TodoApp.Server.GraphQL.Inputs;
using TodoApp.Server.Models;

namespace TodoApp.Server.GraphQL.Mutations
{
    [ExtendObjectType(typeof(Mutation))]
    public class TodoMutations
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
