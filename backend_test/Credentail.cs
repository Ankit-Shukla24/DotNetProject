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

namespace backend_test
{
    public class Tests
    {  //Arrange
        List<Credential> Users = new List<Credential>();
        IQueryable<Credential> UserData;
        Mock<DbSet<Credential>> mockSet;
        Mock<PrjContext> prjmock;
        Mock<IAuthService<Credential>> userService;

        Mock<ICredentialDataProvider<Credential>>userDataProvider;

        Mock<IConfiguration> config;
        CredentialDataProvider credProvider;
        AuthService authService;
        [SetUp]
        public void Setup()
        {
            Users = new List<Credential>()
            {
                new Credential("admin",SecretHasher.Hash("admin"),null,true) ,
                 new Credential("401",SecretHasher.Hash("User1"),401,true),
                  new Credential("402",SecretHasher.Hash("User2"),402,true),
                   new Credential("403",SecretHasher.Hash("User3"),403,false),

             };
            UserData = Users.AsQueryable();
            mockSet = new Mock<DbSet<Credential>>();
            mockSet.As<IQueryable<Credential>>().Setup(m => m.Provider).Returns(UserData.Provider);
            mockSet.As<IQueryable<Credential>>().Setup(m => m.Expression).Returns(UserData.Expression);
            mockSet.As<IQueryable<Credential>>().Setup(m => m.ElementType).Returns(UserData.ElementType);
            mockSet.As<IQueryable<Credential>>().Setup(m => m.GetEnumerator()).Returns(UserData.GetEnumerator());
            var p = new DbContextOptions<PrjContext>();
            prjmock = new Mock<PrjContext>(p);
            prjmock.Setup(x => x.Credentials).Returns(mockSet.Object);
            userService = new Mock<IAuthService<Credential>>();
         
            config = new Mock<IConfiguration>();
            config.Setup(x => x["Jwt:Key"]).Returns("hey fellas how is it going");
            config.Setup(x => x["Jwt:Issuer"]).Returns("me.com");
            credProvider = new CredentialDataProvider(prjmock.Object);
          
            userDataProvider = new Mock<ICredentialDataProvider<Credential>>();
            authService = new AuthService(userDataProvider.Object);
        }

        [Test]
        [TestCase("admin","admin")]
        [TestCase("401", "User1")]

        public void LoginSuccess(string userid, string password)
        {
            CredentialsController Cred = new CredentialsController(config.Object,userService.Object);
            CredentialViewModel admin= new CredentialViewModel(userid, password);
            userService.Setup(x=> x.GetAdminDetail(admin)).Returns(UserData.FirstOrDefault(x=>x.UserId==admin.UserName));
            var res = Cred.Login(admin);
            var okRes = res as OkObjectResult;
            Assert.IsNotNull(okRes);
        }

        [Test]
        [TestCase("403", "user1")]
        [TestCase("405", "user1")]
        public void LoginFail(string userid, string password)
        {
            CredentialsController Cred = new CredentialsController(config.Object, userService.Object);
            CredentialViewModel admin = new CredentialViewModel(userid, password);
            userService.Setup(x => x.GetAdminDetail(admin)).Returns(UserData.FirstOrDefault(x => x.UserId == admin.UserName));
            var res = Cred.Login(admin);
            var okRes = res as OkObjectResult;
            Assert.IsNull(okRes);
        }

        [Test]
        [TestCase("admin","admin")]
        [TestCase("401","User1")]
        public void GetAdminDetailsSuccess(string userid, string password)
        {
            CredentialViewModel login = new CredentialViewModel(userid,password);
            var getAdminDetails = credProvider.GetAdminDetail(login);
            Assert.IsNotNull(getAdminDetails);
            Assert.AreEqual(login.UserName, getAdminDetails.UserId);
        }

        [Test]
        [TestCase("admin0", "admin")]
        [TestCase("405", "User1")]
        [TestCase("402","User3")]
        public void GetAdminDetailsFail(string userid, string password)
        {
            CredentialViewModel login = new CredentialViewModel(userid, password);
            var getAdminDetails = credProvider.GetAdminDetail(login);
            Assert.IsNull(getAdminDetails);
           
        }

        [Test]
        [TestCase("admin")]
        [TestCase("401")]

        public void GetCredentialSuccess(string userid)
        {
            var getCredential = credProvider.GetCredential(userid);

            Assert.IsNotNull(getCredential);
            Assert.AreEqual(userid, getCredential.UserId);
        }
        [Test]
        [TestCase("admin4")]
        [TestCase("406")]

        public void GetCredentialFail(string userid)
        {
            var getCredential = credProvider.GetCredential(userid);

            Assert.IsNull(getCredential);
           
        }

        [Test]
        [TestCase("admin", "admin")]
        [TestCase("401", "User1")]
        public void GetAdminDetailsServiceSuccess(string userid, string password)
        {
            CredentialViewModel login = new CredentialViewModel(userid, password);
            userDataProvider.Setup(x => x.GetAdminDetail(login)).Returns(Users.Find(x => x.UserId == userid));
            var getAdminDetails = authService.GetAdminDetail(login);
            Assert.IsNotNull(getAdminDetails);
            Assert.AreEqual(login.UserName, getAdminDetails.UserId);
        }

        [Test]
        [TestCase("admin0", "admin")]
        [TestCase("405", "User1")]
        public void GetAdminDetailsServiceFail(string userid, string password)
        {
            CredentialViewModel login = new CredentialViewModel(userid, password);
            userDataProvider.Setup(x => x.GetAdminDetail(login)).Returns(Users.Find(x => x.UserId == userid));
            var getAdminDetails = authService.GetAdminDetail(login);
            Assert.IsNull(getAdminDetails);

        }

        [Test]
        [TestCase("admin","admin","admin1")]
        [TestCase("401","User1","user1")]

        public void ChangePasswordSuccess(string userid, string password, string newpassword)
        {
            
            userDataProvider.Setup(x => x.GetCredential(userid)).Returns(Users.Find(x => x.UserId==userid));
            userDataProvider.Setup(x => x.ChangePassword(userid,password,newpassword)).Returns("Password changed successfully");
            var res = authService.ChangePassword(userid, password, newpassword);

            Assert.AreEqual("Password changed successfully",res);
        }

        [Test]
        [TestCase("admin", "admin2", "admin1")]
        [TestCase("408", "User1", "user1")]

        public void ChangePasswordFail(string userid, string password, string newpassword)
        {

            userDataProvider.Setup(x => x.GetCredential(userid)).Returns(Users.Find(x => x.UserId == userid));
            
            var res = authService.ChangePassword(userid, password, newpassword);

            Assert.AreNotEqual("Password changed successfully", res);
        }

        [Test]
        [TestCase("401", false)]
        public void ChangeActivityStatus(string username, bool status)
        {

            userDataProvider.Setup(x => x.ChangeActivityStatus(username, status)).Returns("Customer Deleted");
            var res = authService.ChangeActivityStatus(username,status);
            Assert.AreEqual("Customer Deleted", res);
        }

    }
}