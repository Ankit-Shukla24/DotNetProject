using backend.Data;
using backend.Models;

namespace backend.Service
{
    public interface IAccountService
    {
        public decimal ExchangeRates(string currency,Decimal amount);

        public Account GetAccountDetailsByCustomerId(string customerId);

        public Account GetAccountDetailsByAccountId(int accountId);

        public List<Account> GetAccounts();

        public Account ChangeAccountDetails(AccountViewModel account);

        public string CreateAccount(Account account);

        public void DeleteAccount(int accountId);

        public string WithdrawFromAccount(string currency, decimal amount, string pin, string authHeader);

        public string DepositIntoAccount(string currency, decimal amount, string pin, string authHeader);

        public string PinChange(string oldPin, string newPin, string authHeader);

        public string FundTransfer(string currency, int creditorId, decimal amount, string pin, string authHeader);

        public string GetCustomerFromHeader(string header);
    }
}
