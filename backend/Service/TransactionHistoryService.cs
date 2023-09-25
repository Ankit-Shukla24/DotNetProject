using Azure.Core;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;

namespace backend.Service
{
    public class TransactionHistoryService: ITransactionHistoryService
    {
        private readonly ITransactionHistoryDataProvider _transactionHistoryDataProvider;
       

        public TransactionHistoryService(ITransactionHistoryDataProvider transactionHistoryDataProvider)
        {
            _transactionHistoryDataProvider = transactionHistoryDataProvider;

        }

        public List<Transactionhistory> GetTransactionHistories()
        {
            return _transactionHistoryDataProvider.GetTransactionHistories();
        }

        public List<Transactionhistory> GetTransactionHistoriesByAccountId( int? cus,int limit,string authHeader)
        {
            string customerId;
            if (cus==null)
            {
                var token = authHeader.Split(' ', 2)[1];
                var handler = new JwtSecurityTokenHandler();
                var jsonToken = handler.ReadToken(token);
                var tokenS = handler.ReadToken(token) as JwtSecurityToken;
                customerId = tokenS.Claims.First(claim => claim.Type == "CustomerId").Value;
            }
            else customerId=cus.ToString();
            return _transactionHistoryDataProvider.GetTransactionhistoriesByAccountId(limit,customerId);
        }
    }
}
