using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Service
{
    public interface ITransactionHistoryService
    {
        public List<Transactionhistory> GetTransactionHistories();
        public List<Transactionhistory> GetTransactionHistoriesByAccountId(int? cus, int limit, string authHeader);
    }
}
