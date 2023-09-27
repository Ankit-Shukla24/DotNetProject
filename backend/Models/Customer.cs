using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public partial class Customer
    {
        public Customer()
        {
        }

        public Customer(int customerId, string? firstName, string? lastName, string? address, string? emailId, string? phoneNumber, DateTime? dateOfbirth)
        {
            CustomerId = customerId;
            FirstName = firstName;
            LastName = lastName;
            Address = address;
            EmailId = emailId;
            PhoneNumber = phoneNumber;
            DateOfbirth = dateOfbirth;
        }

        public int CustomerId { get; set; }

        [Required(ErrorMessage = "First Name is required.")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "First Name must be between 2 and 50 characters.")]
        public string? FirstName { get; set; }
        public string? LastName { get; set; }

        [Required(ErrorMessage = "Address is required.")]
        [StringLength(100, ErrorMessage = "Address cannot exceed 100 characters.")]
        public string? Address { get; set; }

        [Required(ErrorMessage = "Email ID is required.")]
        [EmailAddress(ErrorMessage = "Invalid Email Address.")]
        public string? EmailId { get; set; }

        [RegularExpression(@"^\d{10}$", ErrorMessage = "Invalid Phone Number. Please enter a 10-digit phone number.")]
        public string? PhoneNumber { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "Date of Birth")]
        public DateTime? DateOfbirth { get; set; }

        public virtual ICollection<Account> Accounts { get; set; } = new List<Account>();

        public virtual ICollection<Credential> Credentials { get; set; } = new List<Credential>();
    }
}
