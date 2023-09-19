namespace backend.Data
{
    public class CurrencyExchangeDataProvider:ICurrencyExchangeDataProvider
    {
        Dictionary<String, decimal> CurrencyExchangeRate = new Dictionary<String, decimal>() { { "USD", 85 }, { "EURO", 96 }, { "YEN", 0.56M }, { "RUBLE", 0.86M } };

        public Dictionary<string, decimal> GetCurrencyExchangeRates()
        {
            return CurrencyExchangeRate;
        }
    }
}
