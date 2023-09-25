using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public partial class Account
{
    public int AccountId { get; set; }

        [Required(ErrorMessage = "Customer ID is required.")]
        public int? CustomerId { get; set; }

        [Required(ErrorMessage = "Account Type is required.")]
        [StringLength(50, ErrorMessage = "Account Type cannot exceed 50 characters.")]
        public string? AccountType { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Balance must be a non-negative number.")]
    public decimal? Balance { get; set; } // Set the default value to zero

        [Required(ErrorMessage = "Card Number is required.")]
        [StringLength(12, MinimumLength = 12, ErrorMessage = "Card Number must be 12 digits.")]
        public string? CardNo { get; set; }

        [Required(ErrorMessage = "PIN is required.")]
        [RegularExpression(@"^\d{4}$", ErrorMessage = "PIN must be a 4-digit number.")]
        public string? Pin { get; set; }

        [Required(ErrorMessage = "City is required.")]
        [StringLength(50, ErrorMessage = "City cannot ex    ceed 50 characters.")]
        public string? City { get; set; }
    public virtual Customer? Customer { get; set; }

    public virtual ICollection<Transactionhistory> TransactionhistoryCreditors { get; set; } = new List<Transactionhistory>();

    public virtual ICollection<Transactionhistory> TransactionhistoryDebitors { get; set; } = new List<Transactionhistory>();
}
