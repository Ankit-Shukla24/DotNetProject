using backend.Data;
using backend.Models;
using backend.Service;
using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;

namespace backend_test
{
    public class CustomerServiceTests
    {
        private CustomerService _customerService;
        private Mock<ICustomerDataProvider> _customerDataProviderMock;
        List<Customer> Customers;

        [SetUp]
        public void Setup()
        {
            Customers = new List<Customer>{ new Customer( customerId: 1,
    firstName: "John",
    lastName: "Shek",
    address: "Hyd",
    emailId: "john@example.com",
    phoneNumber: "5557777896",
    dateOfbirth: new DateTime(1985, 5, 15)),new Customer(
            customerId: 2,
    firstName: "Alan",
    lastName: "Shek",
    address: "Knp",
    emailId: "john@example.com",
    phoneNumber: "5557778596",
    dateOfbirth: new DateTime(1985, 5, 15))};
            _customerDataProviderMock = new Mock<ICustomerDataProvider>();
            _customerService = new CustomerService(_customerDataProviderMock.Object);
        }

        [Test]
        public void CreateAccountSuccess()
        {
            Customer customer = Customers[0];
            _customerDataProviderMock.Setup(x => x.CreateAccount(customer)).Returns("Account created successfully");
            var result = _customerService.CreateAccount(customer);
            Assert.AreEqual("Account created successfully", result);
        }

        [Test]
        public void CreateAccountFail()
        {
            var customer = Customers[0];
            _customerDataProviderMock.Setup(x => x.CreateAccount(customer)).Returns("Account already exists");
            var result = _customerService.CreateAccount(customer);
            Assert.AreEqual("Account already exists", result);
        }

        [Test]
        public void GetCustomerDetailsByCustomerIdSuccess()
        {
            var customerId = 2;
            var expectedCustomer = Customers[1];
            _customerDataProviderMock.Setup(x => x.GetCustomerDetailsByCustomerId(customerId)).Returns(Customers.Find(x=>x.CustomerId==customerId));
            var result = _customerService.GetCustomerDetailsByCustomerId(customerId);
            Assert.AreEqual(expectedCustomer, result);
        }

        [Test]
        public void GetCustomerDetailsByCustomerIdfail()
        {
            var customerId = 3;
            var expectedCustomer = Customers[1];
            _customerDataProviderMock.Setup(x => x.GetCustomerDetailsByCustomerId(customerId)).Returns(Customers.Find(x => x.CustomerId == customerId));
            var result = _customerService.GetCustomerDetailsByCustomerId(customerId);
            Assert.AreEqual(null, result);
        }
        [Test]
        public void GetCustomers()
        {
          
            var expectedCustomers = new List<Customer>
    {
        new Customer(1, "John", "Shek", "Hyd", "john@example.com", "5557777896", new DateTime(1985, 5, 15)),
        new Customer(2, "Alan", "Shek", "Knp", "john@example.com", "5557778596", new DateTime(1985, 5, 15))
      
    };

            _customerDataProviderMock.Setup(x => x.GetCustomers()).Returns(Customers);

            var result = _customerService.GetCustomers();

            Assert.AreEqual(expectedCustomers.Count(), result.Count());
        }
        [Test]
        public void PutCustomerSuccess()
        {

            var customerToUpdate = Customers[0];
            var updatedCustomer = new Customer(1, "Alex", "Shek", "Hyd", "john@example.com", "5557777896", new DateTime(1985, 5, 15));

            _customerDataProviderMock.Setup(x => x.PutCustomer(customerToUpdate)).Returns(updatedCustomer);

            var result = _customerService.PutCustomer(customerToUpdate);


            Assert.AreEqual(updatedCustomer.FirstName, result.FirstName);
        }

        [Test]
        public void PutCustomerFail()
        {
        
            var customerToUpdate = new Customer(3, "Alice", "Johnson", "Bnk", "johnson@example.com", "555555555", new DateTime(1995, 10, 10));

            _customerDataProviderMock.Setup(x => x.PutCustomer(customerToUpdate)).Returns((Customer)null);

            var result = _customerService.PutCustomer(customerToUpdate);

            Assert.IsNull(result);
        }





    }
}
