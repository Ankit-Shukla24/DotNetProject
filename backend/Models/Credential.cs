using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Credential
{
    public Credential()
    {
    }

    public Credential(string userId, string? password, int? customerId, bool? isEnabled)
    {
        UserId = userId;
        Password = password;
        CustomerId = customerId;
        IsEnabled = isEnabled;
    }

    public string UserId { get; set; } = null!;

    public string? Password { get; set; }

    public int? CustomerId { get; set; }

    public bool? IsEnabled { get; set; }

    public virtual Customer? Customer { get; set; }
}
