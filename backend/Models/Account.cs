using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace backend.Models;

public partial class Account
{
    public int AccountId { get; set; }

    public int? CustomerId { get; set; }

    public string? AccountType { get; set; }

    public decimal? Balance { get; set; }

    public string? CardNo { get; set; }

    public int? Pin { get; set; }

    public string? City { get; set; }
    [JsonIgnore]
    public virtual Customer? Customer { get; set; }
    [JsonIgnore]
    public virtual ICollection<Transactionhistory> Transactionhistories { get; set; } = new List<Transactionhistory>();
}
