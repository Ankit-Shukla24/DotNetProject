
using backend.Models;
using System.Diagnostics.Contracts;

namespace backend.Data
{
    public interface IAccountDataProvider
    {
        public Dictionary<String,decimal> GetCurrencyExchangeRates();

        public Account GetAccountByCustomerId(String accountId);
    }
}
