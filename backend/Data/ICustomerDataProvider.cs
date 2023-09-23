
using backend.Models;
using System.Diagnostics.Contracts;

namespace backend.Data
{
    public interface ICustomerDataProvider
    {
        public Customer GetCustomerDetailsByCustomerId(string customerId);
        public List<Customer> GetCustomers();

        public string CreateAccount(Customer customer);

    }
}
