using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Transactionhistory
{
    public Transactionhistory(int? debitorId, int? creditorId, decimal? amount, DateTime? transactionDate)
    {
        DebitorId=debitorId;
        CreditorId=creditorId;
        Amount=amount;
        TransactionDate=transactionDate;
    }

    public int TransactionId { get; set; }

    public int? DebitorId { get; set; }

    public int? CreditorId { get; set; }

    public decimal? Amount { get; set; }

    public DateTime? TransactionDate { get; set; }

    public virtual Account? Creditor { get; set; }

    public virtual Account? Debitor { get; set; }

}