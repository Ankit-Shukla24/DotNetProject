using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Account
{
    public int AccountId { get; set; }

    public int? CustomerId { get; set; }

    public string? AccountType { get; set; }

    public decimal? Balance { get; set; }

    public string? CardNo { get; set; }

    public string? Pin { get; set; }

    public string? City { get; set; }

    public virtual Customer? Customer { get; set; }

    public virtual ICollection<Transactionhistory> TransactionhistoryCreditors { get; set; } = new List<Transactionhistory>();

    public virtual ICollection<Transactionhistory> TransactionhistoryDebitors { get; set; } = new List<Transactionhistory>();
}
