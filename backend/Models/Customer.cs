using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace backend.Models;

public partial class Customer
{
    
    public int CustomerId { get; set; }

    [Required(ErrorMessage = "Please enter the FirstName")]
    public string? FirstName { get; set; }

    [Required(ErrorMessage = "Please enter the LastName")]
    public string? LastName { get; set; }

    [Required(ErrorMessage = "Please enter the Address")]
    public string? Address { get; set; }

    [Required(ErrorMessage ="Enter email address")]
    [DataType(DataType.EmailAddress)]
    [EmailAddress(ErrorMessage ="Enter valid email")]
    public string? EmailId { get; set; }

    [Required(ErrorMessage ="Enter phone number")]
    [StringLength(10,MinimumLength =10,ErrorMessage ="Enter valid Phone Number")]
    public string? PhoneNumber { get; set; }
    [Required(ErrorMessage ="Enter date of birth")]
    public DateTime? DateOfbirth { get; set; }
    [JsonIgnore]
    public virtual ICollection<Account> Accounts { get; set; } = new List<Account>();
}
