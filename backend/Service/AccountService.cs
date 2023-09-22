using backend.Data;
using backend.Models;

namespace backend.Service
{
    public class AccountService: IAccountService
    {
        private readonly IAccountDataProvider _accountDataProvider;

        public AccountService(IAccountDataProvider currencyExchangeDataProvider)
        {
            _accountDataProvider=currencyExchangeDataProvider;
        }

        public decimal ExchangeRates(string currency, decimal amount)
        {
            Dictionary<string,decimal> CurrencyExchangeRates = _accountDataProvider.GetCurrencyExchangeRates();

            return CurrencyExchangeRates[currency]*amount;
        }

        public Account GetAccountDetails(string customerId)
        {
            return _accountDataProvider.GetAccountByCustomerId(customerId);
        }
    }
}
