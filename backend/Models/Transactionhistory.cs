using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace backend.Models;

public partial class Transactionhistory
{
    public int TransactionId { get; set; }

    public int? AccountId { get; set; }

    public DateTime? TransactionDate { get; set; }

    public decimal? AmountWithdrawn { get; set; }
    [JsonIgnore]
    public virtual Account? Account { get; set; }
}
