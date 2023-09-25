using backend.Data;
using backend.Models;

namespace backend.Service
{
    public interface ICustomerService
    {
        public Customer GetCustomerDetailsByCustomerId(string customerId);
        public List<Customer> GetCustomers();

        public string CreateAccount(Customer customer);

    }
}
