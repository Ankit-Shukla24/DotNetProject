using Azure.Core;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;

namespace backend.Service
{
    public class CustomerService: ICustomerService
    {
        private readonly ICustomerDataProvider _customerDataProvider;

        public CustomerService(ICustomerDataProvider customerDataProvider)
        {
            _customerDataProvider = customerDataProvider;
        }

        public string CreateAccount(Customer customer)
        {
            return _customerDataProvider.CreateAccount(customer);
        }

        public Customer GetCustomerDetailsByCustomerId(string customerId)
        {
            return _customerDataProvider.GetCustomerDetailsByCustomerId(customerId);
        }

        public List<Customer> GetCustomers()
        {
         return _customerDataProvider.GetCustomers();
        }
    }
}
