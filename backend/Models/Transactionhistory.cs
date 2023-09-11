using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Transactionhistory
{
    public int TransactionId { get; set; }

    public int? AccountId { get; set; }

    public DateTime? TransactionDate { get; set; }

    public decimal? AmountWithdrawn { get; set; }

    public virtual Account? Account { get; set; }
}
