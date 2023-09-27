using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public partial class AccountViewModel
{

    public int AccountId { get; set; }

    [Required(ErrorMessage = "Customer ID is required.")]
    public int? CustomerId { get; set; }

    [Required(ErrorMessage = "Account Type is required.")]
    [StringLength(50, ErrorMessage = "Account Type cannot exceed 50 characters.")]
    public string? AccountType { get; set; }

   

    [Required(ErrorMessage = "Card Number is required.")]
    [StringLength(12, MinimumLength = 12, ErrorMessage = "Card Number must be 12 digits.")]
    public string? CardNo { get; set; }

    public string? Pin { get; set; }

    [Required(ErrorMessage = "City is required.")]
    [StringLength(50, ErrorMessage = "City cannot ex    ceed 50 characters.")]
    public string? City { get; set; }
   
}
