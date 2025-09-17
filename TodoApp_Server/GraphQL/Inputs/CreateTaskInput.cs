using HotChocolate;
using HotChocolate.Types;
using System.ComponentModel.DataAnnotations;

namespace TodoApp.Server.GraphQL.Inputs
{
    public class CreateTaskInput
    {
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [StringLength(1000)]
        public string Description { get; set; } = string.Empty;
    }
    
    public class CreateTaskInputType : InputObjectType<CreateTaskInput>
    {
        protected override void Configure(IInputObjectTypeDescriptor<CreateTaskInput> descriptor)
        {
            descriptor.Description("Input for creating a new task");
            
            descriptor
                .Field(t => t.Title)
                .Description("The title of the task")
                .Type<NonNullType<StringType>>();
                
            descriptor
                .Field(t => t.Description)
                .Description("The description of the task")
                .Type<StringType>();
        }
    }
}
