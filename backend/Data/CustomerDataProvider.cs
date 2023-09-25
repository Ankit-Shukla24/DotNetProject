using Azure.Core;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class CustomerDataProvider : ICustomerDataProvider
    {
        
        private readonly PrjContext _context;

        public CustomerDataProvider(PrjContext context)
        {
            _context = context;
        }

        public Customer GetCustomerDetailsByCustomerId(int customerId)
        {
            return _context.Customers.Include("Accounts").Include("Credentials").FirstOrDefault(cust => customerId == cust.CustomerId);
        }

        public List<Customer> GetCustomers()
        {
            return _context.Customers.ToList();
        }

        public string CreateAccount(Customer customer)
        {

            var transaction = _context.Database.BeginTransaction();
            try
            {
                _context.Customers.Add(customer);
                _context.SaveChanges();
                Console.WriteLine("id:   " + customer.CustomerId);
                var cred = new Credential();
                cred.CustomerId = customer.CustomerId;
                cred.UserId = customer.CustomerId.ToString();
                cred.Password = SecretHasher.Hash("1234");
                cred.IsEnabled = true;
                _context.Credentials.Add(cred);
                _context.SaveChanges();
                transaction.Commit();
                return ("Customer Created Successfully");

            }
            catch (Exception e)
            {
                Console.WriteLine("Error:   " + e.ToString());
                transaction.Rollback();
                return (e.ToString());
            }
            
        }

        public Customer PutCustomer(Customer customer)
        {
            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }

            return customer;
        }
    }
}
