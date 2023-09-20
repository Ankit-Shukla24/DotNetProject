
using backend.Models;
using System.Diagnostics.Contracts;

namespace backend.Data
{
    public interface ICurrencyExchangeDataProvider
    {
        public Dictionary<String,decimal> GetCurrencyExchangeRates();
    }
}
