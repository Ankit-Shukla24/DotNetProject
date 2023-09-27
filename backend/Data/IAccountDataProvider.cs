
using backend.Models;
using System.Diagnostics.Contracts;

namespace backend.Data
{
    public interface IAccountDataProvider
    {
        public Dictionary<String,decimal> GetCurrencyExchangeRates();

        public Account GetAccountByCustomerId(String accountId);
        public List<Account> GetAccounts();
        public Account GetAccountByAccountId(int accountId);

        public string WithdrawFromAccount(Account account, decimal amount);
        public Customer GetUserIfExists(Account account);

        public string CreateAccount(Account account);

        public string DepositIntoAccount(Account account, decimal amount);

        public string FundTransfer(Account creditor,Account debitor,decimal amount);

        public string PinChange(Account account);
        Account ChangeAccountDetails(AccountViewModel account);
    }
}
