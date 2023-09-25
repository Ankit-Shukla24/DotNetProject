
using backend.Models;
using System.Diagnostics.Contracts;

namespace backend.Data
{
    public interface ICustomerDataProvider
    {
        public Customer GetCustomerDetailsByCustomerId(int customerId);
        public List<Customer> GetCustomers();

        public string CreateAccount(Customer customer);

        public Customer PutCustomer(Customer customer);

    }
}
