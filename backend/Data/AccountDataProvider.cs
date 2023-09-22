using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AccountDataProvider:IAccountDataProvider
    {
        Dictionary<String, decimal> CurrencyExchangeRate = new Dictionary<String, decimal>() { { "USD", 85 }, { "EURO", 96 }, { "YEN", 0.56M }, { "RUBLE", 0.86M } };

        private readonly PrjContext _context;

        public AccountDataProvider(PrjContext context)
        {
            _context = context;
        }

        public Account GetAccountByCustomerId(string customerId)
        {
            return _context.Accounts.SingleOrDefault(a => a.CustomerId.ToString()==customerId);
        }

        public Dictionary<string, decimal> GetCurrencyExchangeRates()
        {
            return CurrencyExchangeRate;
        }
    }
}
