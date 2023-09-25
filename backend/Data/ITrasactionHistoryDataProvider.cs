
using backend.Models;
using System.Diagnostics.Contracts;

namespace backend.Data
{
    public interface ITransactionHistoryDataProvider
    { 
        public List<Transactionhistory> GetTransactionHistories();

        public List<Transactionhistory> GetTransactionhistoriesByAccountId(int limit,string customerId);
    }
}
