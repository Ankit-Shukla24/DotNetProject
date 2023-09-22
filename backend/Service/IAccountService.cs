using backend.Data;
using backend.Models;

namespace backend.Service
{
    public interface IAccountService
    {
        public decimal ExchangeRates(string currency,Decimal amount);

        public Account GetAccountDetailsByCustmerId(string customerId);

        public Account GetAccountByAccountId(string accountId);

        public List<Account> GetAccounts();

        public string ChangeAccountDetails(int accountId,Account account);


    }
}
