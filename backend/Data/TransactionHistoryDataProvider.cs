using Azure.Core;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;

namespace backend.Data
{
    public class TransactionHistoryDataProvider : ITransactionHistoryDataProvider
    { 
        private readonly PrjContext _context;

        public TransactionHistoryDataProvider(PrjContext context)
        {
            _context = context;
         
        }


        public List<Transactionhistory> GetTransactionHistories()
        {
            return _context.Transactionhistories.ToList();
        }


        public List<Transactionhistory> GetTransactionhistoriesByAccountId(int limit, string customerId)
        {
            var account = _context.Accounts.SingleOrDefault(a => a.CustomerId.ToString() == customerId);
            return _context.Transactionhistories.Where(x => x.CreditorId == account.AccountId || x.DebitorId == account.AccountId).OrderByDescending(x => x.TransactionDate).Take(limit).ToList();

        }
    }
}
