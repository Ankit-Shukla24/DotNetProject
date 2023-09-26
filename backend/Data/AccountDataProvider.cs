using Azure.Core;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AccountDataProvider : IAccountDataProvider
    {
        Dictionary<String, decimal> CurrencyExchangeRate = new Dictionary<String, decimal>() { { "USD", 85 }, { "EURO", 96 }, { "YEN", 0.56M }, { "RUBLE", 0.86M } };

        private readonly PrjContext _context;

        public AccountDataProvider(PrjContext context)
        {
            _context = context;
        }

        public Account GetAccountByCustomerId(string customerId)
        {
            return _context.Accounts.SingleOrDefault(a => a.CustomerId.ToString() == customerId);
        }

        public Dictionary<string, decimal> GetCurrencyExchangeRates()
        {
            return CurrencyExchangeRate;
        }

        public List<Account> GetAccounts()
        {
            return _context.Accounts.ToList();
        }

        public Account GetAccountByAccountId(int accountId)
        {
            return _context.Accounts.Find(accountId);
        }

        public string WithdrawFromAccount(Account account,decimal amount)
        {
            var transaction = _context.Database.BeginTransaction();
            try
            {

                _context.Accounts.Update(account);
                _context.Transactionhistories.Add(new Transactionhistory(account.AccountId, null, amount, DateTime.Now));
                _context.SaveChanges();
                transaction.Commit();
                return "Balance :"+account.Balance.ToString();

            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return (ex.ToString());
            }
        }

        public Customer GetUserIfExists(Account account)
        {
            return _context.Customers.Where(acc => acc.CustomerId == account.CustomerId)?.Include(x => x.Accounts)?.FirstOrDefault();
        }

        public string CreateAccount(Account account)
        {

            _context.Accounts.Add(account);
            _context.SaveChanges();
            return "Account created successfully";
        }

        public string DepositIntoAccount(Account account, decimal amount)
        {
            var transaction = _context.Database.BeginTransaction();
            try
            {

                _context.Accounts.Update(account);
                _context.Transactionhistories.Add(new Transactionhistory(null, account.AccountId, amount, DateTime.Now));
                _context.SaveChanges();
                transaction.Commit();
                return "Balance :"+account.Balance.ToString();
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return ex.ToString();


            }
        }

        public string FundTransfer(Account creditor, Account debitor, decimal amount)
        {
            var transaction = _context.Database.BeginTransaction();
            try
            { 

                _context.Accounts.Update(creditor);
                _context.Accounts.Update(debitor);

                _context.Transactionhistories.Add(new Transactionhistory(debitor.AccountId, creditor.AccountId, amount, DateTime.Now));

                _context.SaveChanges();
                transaction.Commit();
                return ("Funds transferred");
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return (ex.Message);
            }
        }

        public string PinChange(Account account)
        {
            var transaction = _context.Database.BeginTransaction();
            try
            {

                _context.Accounts.Update(account);

                _context.SaveChanges();
                transaction.Commit();
                return ("PIN changed successfully");
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return (ex.ToString());
            }
        }

        public Account ChangeAccountDetails(Account account)
        {
            _context.Entry(account).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }

            return account;
        }
    }
}
