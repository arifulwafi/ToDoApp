using HotChocolate;
using HotChocolate.Types;
using TodoApp.Server.Models;

namespace TodoApp.Server.GraphQL.Types
{
    public class TaskStatusType : EnumType<Models.TaskStatus>
    {
        protected override void Configure(IEnumTypeDescriptor<Models.TaskStatus> descriptor)
        {
            descriptor.Description("The status of a task");
            
            descriptor.Value(Models.TaskStatus.Pending)
                .Description("The task is pending completion");
                
            descriptor.Value(Models.TaskStatus.Completed)
                .Description("The task has been completed");
        }
    }
}
