using backend.Data;

namespace backend.Service
{
    public class CurrecyExchangeService: ICurrencyExchangeService
    {
        private readonly ICurrencyExchangeDataProvider _currencyExchangeDataProvider;

        public CurrecyExchangeService(ICurrencyExchangeDataProvider currencyExchangeDataProvider)
        {
            _currencyExchangeDataProvider=currencyExchangeDataProvider;
        }

        public decimal ExchangeRates(string currency, decimal amount)
        {
            Dictionary<string,decimal> CurrencyExchangeRates = _currencyExchangeDataProvider.GetCurrencyExchangeRates();

            return CurrencyExchangeRates[currency]*amount;
        }
    }
}
