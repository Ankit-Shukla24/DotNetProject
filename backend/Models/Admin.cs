using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Admin
{
    public string UserName { get; set; } = null!;

    public string? Password { get; set; }

    public string? Email { get; set; }

    public string? UserType { get; set; }
}
