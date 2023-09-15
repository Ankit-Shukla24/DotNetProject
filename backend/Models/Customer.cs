﻿using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Customer
{
    public int CustomerId { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Address { get; set; }

    public string? EmailId { get; set; }

    public string? PhoneNumber { get; set; }

    public DateTime? DateOfbirth { get; set; }

    public virtual ICollection<Account> Accounts { get; set; } = new List<Account>();

    public virtual ICollection<Credential> Credentials { get; set; } = new List<Credential>();
}
