using System.ComponentModel.DataAnnotations;

namespace TodoApp.Server.Models
{
    public class Task
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [StringLength(1000)]
        public string Description { get; set; } = string.Empty;
        
        public TaskStatus Status { get; set; } = TaskStatus.Pending;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? UpdatedAt { get; set; }
    }
    
    public enum TaskStatus
    {
        Pending,
        Completed
    }
}
