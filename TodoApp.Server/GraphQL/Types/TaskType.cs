using HotChocolate;
using HotChocolate.Types;
using TodoApp.Server.Models;

namespace TodoApp.Server.GraphQL.Types
{
    public class TaskType : ObjectType<Models.Task>
    {
        protected override void Configure(IObjectTypeDescriptor<Models.Task> descriptor)
        {
            descriptor.Description("Represents a task in the todo application");
            
            descriptor
                .Field(t => t.Id)
                .Description("The unique identifier of the task");
                
            descriptor
                .Field(t => t.Title)
                .Description("The title of the task");
                
            descriptor
                .Field(t => t.Description)
                .Description("The description of the task");
                
            descriptor
                .Field(t => t.Status)
                .Description("The current status of the task");
                
            descriptor
                .Field(t => t.CreatedAt)
                .Description("When the task was created");
                
            descriptor
                .Field(t => t.UpdatedAt)
                .Description("When the task was last updated");
        }
    }
}
