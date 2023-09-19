using backend.Data;

namespace backend.Service
{
    public interface ICurrencyExchangeService
    {
        public decimal ExchangeRates(string currency,Decimal amount);
    }
}
