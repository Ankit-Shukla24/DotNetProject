using Azure.Core;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;

namespace backend.Service
{
    public class AccountService: IAccountService
    {
        private readonly IAccountDataProvider _accountDataProvider;

        public AccountService(IAccountDataProvider accountDataProvider)
        {
            _accountDataProvider=accountDataProvider;
        }

        public Account ChangeAccountDetails(AccountViewModel account)
        {
            return _accountDataProvider.ChangeAccountDetails(account);
        }

        public string CreateAccount(Account account)
        {

            var customer = _accountDataProvider.GetUserIfExists(account);

            if (customer == null)
            {
                return "Customer does not exists";
            }
            else if (customer.Accounts.Count() != 0)
                return "Customer already has a account";
            account.Pin = SecretHasher.Hash(account.Pin);
            return _accountDataProvider.CreateAccount(account) ;
        }

        public void DeleteAccount(int accountId)
        {
            throw new NotImplementedException();
        }

        public string DepositIntoAccount(string currency, decimal amount, string pin,string authHeader)
        {

            if (amount < 0)
                return "The amount cannot be less than 0";

            if (currency != "RUPEE")
            {
                amount = ExchangeRates(currency, amount);
            }

            var customerId = GetCustomerFromHeader(authHeader);
         
                var account =_accountDataProvider.GetAccountByCustomerId(customerId);
                if (account == null) return "No existing account found";
                if (!SecretHasher.Verify(pin, account.Pin)) return ("Entered PIN is incorrect");
                account.Balance += amount;
              
                return _accountDataProvider.DepositIntoAccount(account,amount);
          
        }

        public decimal ExchangeRates(string currency, decimal amount)
        {
            Dictionary<string,decimal> CurrencyExchangeRates = _accountDataProvider.GetCurrencyExchangeRates();

            return CurrencyExchangeRates[currency]*amount;
        }

        public string FundTransfer(string currency, int creditorId,decimal amount, string pin,string authHeader)
        {
            var customerId = GetCustomerFromHeader(authHeader);


            if (amount < 0)
                return "The amount cannot be less than 0";

                if (currency != "RUPEE")
                {
                    amount = ExchangeRates(currency, amount);
                }

                var creditor =_accountDataProvider.GetAccountByAccountId(creditorId);
                var debitor =_accountDataProvider.GetAccountByCustomerId(customerId);
                if (debitor == null) return("No existing account found");

                if (creditor == null) return (creditorId + " not found");
                if (debitor.Balance < amount)
                    return ("Cannot withdraw amount greater than balance");
                if (!SecretHasher.Verify(pin, debitor.Pin)) return ("Entered PIN is incorrect");

            creditor.Balance += amount;
            debitor.Balance -= amount;

            return _accountDataProvider.FundTransfer(creditor, debitor,amount);
          
        }

        public Account GetAccountDetailsByAccountId(int accountId)
        {
            return _accountDataProvider.GetAccountByAccountId(accountId);
        }

        public Account GetAccountDetailsByCustomerId(string customerId)
        {
            return _accountDataProvider.GetAccountByCustomerId(customerId);
        }

        public List<Account> GetAccounts()
        {
            return _accountDataProvider.GetAccounts();
        }

        public string GetCustomerFromHeader(string header)
        {
            var token = header.Split(' ', 2)[1];
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(token);
            var tokenS = handler.ReadToken(token) as JwtSecurityToken;
            var customerId = tokenS.Claims.First(claim => claim.Type == "CustomerId").Value;
            return customerId;
        }

        public string PinChange(string oldPin, string newPin,string authHeader)
        {
      
                var customerId = GetCustomerFromHeader(authHeader);

            var account = _accountDataProvider.GetAccountByCustomerId(customerId);
                if (account == null) return ("No existing account found");
                if (!SecretHasher.Verify(oldPin, account.Pin)) return ("Old PIN doesn't match with existing PIN");
                account.Pin = SecretHasher.Hash(newPin);
             
            return _accountDataProvider.PinChange(account);
        }

        public Account PutAccount(Account account)
        {
            throw new NotImplementedException();
        }

        public string WithdrawFromAccount(string currency, decimal amount, string pin,string authHeader)
        {
            
           
                if (amount < 0)
                    return "The amount cannot be less than 0";

                if (currency != "RUPEE")
                {
                    amount = ExchangeRates(currency, amount);
                }
                string customerId = GetCustomerFromHeader(authHeader);
                var account = _accountDataProvider.GetAccountByCustomerId(customerId);
                if (account == null) return "No existing account found";
                if (!SecretHasher.Verify(pin, account.Pin)) return "Entered PIN is incorrect";
                if (account.Balance >= amount)
                {
                    account.Balance -= amount;
                    
                    return _accountDataProvider.WithdrawFromAccount(account,amount);
                }
                else
                {
                    return "Cannot withdraw amount greater than balance";
                }
      
     
        }
    }
}
