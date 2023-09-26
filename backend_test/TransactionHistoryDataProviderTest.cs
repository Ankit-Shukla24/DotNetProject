using backend.Models;
using Microsoft.EntityFrameworkCore;
using Moq;
using backend;
using backend.Controllers;
using backend.Data;
using System.Net;
using backend.Service;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.AspNetCore.Http;

namespace backend_test
{
    public class TransactionHistoryDataProviderTest
    {
        List<Account> Accounts = new List<Account>();
        List<Transactionhistory> Transactionhistories = new List<Transactionhistory>(); 
        IQueryable<Account> AccountsData;
        IQueryable<Transactionhistory> TransactionhistoriesData;
        Mock<DbSet<Transactionhistory>> mockTransaction;
        Mock<DbSet<Account>> mockAccount;
        Mock<PrjContext> prjmock;
        TransactionHistoryDataProvider transactions;

        [SetUp]
        public void Setup()
        {
            Accounts = new List<Account>()
            {
            new Account(5002, 101, "Savings", 1000.00M, "123456789012", "1234", "New York"),
            new Account(5006, 102, "Checking", 1500.00M, "987654321012", "5678", "Los Angeles"),
            new Account(5008, 103, "Savings", 800.00M, "543219876543", "9876", "Chicago")

        };

            Transactionhistories = new List<Transactionhistory>(){

             new Transactionhistory(5002, 5006, 100.00M, DateTime.Now.AddDays(-1)),
             new Transactionhistory(5006, 5008, 50.00M, DateTime.Now.AddDays(-2)),
            new Transactionhistory(5008, 5002, 75.00M, DateTime.Now.AddDays(-3))
        };

            AccountsData = Accounts.AsQueryable();
            mockAccount = new Mock<DbSet<Account>>();
            mockAccount.As<IQueryable<Account>>().Setup(m => m.Provider).Returns(AccountsData.Provider);
            mockAccount.As<IQueryable<Account>>().Setup(m => m.Expression).Returns(AccountsData.Expression);
            mockAccount.As<IQueryable<Account>>().Setup(m => m.ElementType).Returns(AccountsData.ElementType);
            mockAccount.As<IQueryable<Account>>().Setup(m => m.GetEnumerator()).Returns(AccountsData.GetEnumerator());
            var p = new DbContextOptions<PrjContext>();
            prjmock = new Mock<PrjContext>(p);
            prjmock.Setup(x => x.Accounts).Returns(mockAccount.Object);
            
            TransactionhistoriesData =Transactionhistories.AsQueryable();
            mockTransaction = new Mock<DbSet<Transactionhistory>>();
            mockTransaction.As<IQueryable<Transactionhistory>>().Setup(m => m.Provider).Returns(TransactionhistoriesData.Provider);
            mockTransaction.As<IQueryable<Transactionhistory>>().Setup(m => m.Expression).Returns(TransactionhistoriesData.Expression);
            mockTransaction.As<IQueryable<Transactionhistory>>().Setup(m => m.ElementType).Returns(TransactionhistoriesData.ElementType);
            mockTransaction.As<IQueryable<Transactionhistory>>().Setup(m => m.GetEnumerator()).Returns(TransactionhistoriesData.GetEnumerator());
            prjmock.Setup(x => x.Transactionhistories).Returns(mockTransaction.Object);
            transactions = new TransactionHistoryDataProvider(prjmock.Object);
        }

        [Test]

        public void GetTransactionHistories()
        {
            var res = transactions.GetTransactionHistories();

            Assert.IsNotNull(res);
            Assert.AreEqual(3, res.Count);
        }

        [Test]
        [TestCase(1,"101")]
        [TestCase(2,"102")]
        public void GetTransactionHistoryByAccountId(int limit,string customerId) {

            var res = transactions.GetTransactionhistoriesByAccountId(limit,customerId);
            Assert.AreEqual(res.Count, limit);
        }

    }
}