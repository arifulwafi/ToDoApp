using HotChocolate;
using HotChocolate.Types;
using System.ComponentModel.DataAnnotations;
using TodoApp.Server.Models;

namespace TodoApp.Server.GraphQL.Inputs
{
    public class UpdateTaskStatusInput
    {
        [Required]
        public int Id { get; set; }
        
        [Required]
        public Models.TaskStatus Status { get; set; }
    }
    
    public class UpdateTaskStatusInputType : InputObjectType<UpdateTaskStatusInput>
    {
        protected override void Configure(IInputObjectTypeDescriptor<UpdateTaskStatusInput> descriptor)
        {
            descriptor.Description("Input for updating a task's status");
            
            descriptor
                .Field(t => t.Id)
                .Description("The ID of the task to update")
                .Type<NonNullType<IntType>>();
                
            descriptor
                .Field(t => t.Status)
                .Description("The new status of the task")
                .Type<NonNullType<Types.TaskStatusType>>();
        }
    }
}
