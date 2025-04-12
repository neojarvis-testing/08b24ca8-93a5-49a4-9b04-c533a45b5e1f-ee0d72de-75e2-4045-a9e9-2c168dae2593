using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class Feedback
    {
        public int FeedbackId{get;set;}
        public int UserId{get;set;}
        public string Comments{get;set;}
        public DateTime DateProvided{get;set;}
        public User? User{get;set;}
        
    }
}

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Feedback
{
    [Key]
    public int FeedbackId { get; set; }

    [Required]

    public int UserId { get; set; }

    [Required]
    [MaxLength(1000, ErrorMessage = "Comments cannot exceed 1000 characters.")]
    public string Comments { get; set; }

    [Required]
    public DateTime DateProvided { get; set; }

    // Navigation property
    public  User? User { get; set; }
}