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
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend_test
{
    public class CredentialControllerTest
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
            
        }

        [Test]
        [TestCase("admin","admin")]
        [TestCase("401", "User1")]

        public void LoginSuccess(string userid, string password)
        {
            CredentialsController Cred = new CredentialsController(config.Object, userService.Object);
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
        [TestCase("admin", "admin", "admin1")]
        [TestCase("401", "User1", "user1")]

        public void ChangePasswordSuccess(string userid, string password, string newpassword)
        {
            CredentialsController Cred = new CredentialsController(config.Object, userService.Object);
            Credential cred = new Credential(userid, password, null, true);
            var authHeader = "Bearer " + GenerateJSONWebToken(cred);

            Cred.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext
                {
                    Request =
                    {
                        Headers = { { "Authorization", authHeader } }
                    }
                }
            };

            userService.Setup(x => x.ChangePassword(userid, password, newpassword))
                .Returns("Password changed successfully");

       
            var result = Cred.passwordchange(password, newpassword);

           
            Assert.AreEqual("Password changed successfully", result);
        }

        [Test]
        [TestCase("admin", "admin", "admin1")]
        [TestCase("401", "User1", "user1")]

        public void ChangePasswordFail(string userid, string password, string newpassword)
        {
            CredentialsController Cred = new CredentialsController(config.Object, userService.Object);
            Credential cred = new Credential(userid, password, null, true);
            var authHeader = "Bearer " + GenerateJSONWebToken(cred);

            Cred.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext
                {
                    Request =
                    {
                        Headers = { { "Authorization", authHeader } }
                    }
                }
            };
            
            userService.Setup(x => x.ChangePassword(userid, password, newpassword))
                .Returns("Old and new passwords dont match");


            var result = Cred.passwordchange(password, newpassword);


            
            Assert.AreNotEqual("Password changed successfully", result);
        }

        private string GenerateJSONWebToken(Credential adminInfo)
        {
            try
            {
                if (adminInfo is null)
                {
                    throw new ArgumentNullException(nameof(adminInfo));
                }
                List<Claim> claims = new List<Claim>();
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("hey fellas how is it going"));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
                claims.Add(new Claim("Username", adminInfo.UserId));
                if (adminInfo.CustomerId == null)
                {
                    claims.Add(new Claim("UserType", "Admin"));
                    claims.Add(new Claim(ClaimTypes.Role, "Admin"));
                }
                else
                {
                    claims.Add(new Claim("UserType", "Customer"));
                    claims.Add(new Claim("CustomerId", adminInfo.CustomerId.ToString()));
                    claims.Add(new Claim(ClaimTypes.Role, "Customer"));
                }
                var token = new JwtSecurityToken("me.com",
                  "me.com",
                  claims,
                  expires: DateTime.Now.AddMinutes(20000),
                  signingCredentials: credentials);
                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return null;
            }

        }

        [Test]
        [TestCase("401",false)]

        public void ChangeActivityStatusSuccess(string userid,Boolean isEnable)
        {
            CredentialsController Cred = new CredentialsController(config.Object, userService.Object);
            Credential cred = new Credential("admin","admin", null, true);
            var authHeader = "Bearer " + GenerateJSONWebToken(cred);

            Cred.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext
                {
                    Request =
                    {
                        Headers = { { "Authorization", authHeader } }
                    }
                }
            };

            userService.Setup(x => x.ChangeActivityStatus(userid, isEnable))
                .Returns("User disabled");


            var result = Cred.SetActiveStatus(userid, isEnable) as OkObjectResult;

            Assert.AreEqual(result.StatusCode,200);

        }


        [Test]
        [TestCase("401", false)]

        public void ChangeActivityStatusFail(string userid, Boolean isEnable)
        {
            CredentialsController Cred = new CredentialsController(config.Object, userService.Object);
            Credential cred = new Credential("401", "User1", 401, true);
            var authHeader = "Bearer " + GenerateJSONWebToken(cred);

            Cred.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext
                {
                    Request =
                    {
                        Headers = { { "Authorization", authHeader } }
                    }
                }
            };

            userService.Setup(x => x.ChangeActivityStatus(userid, isEnable))
                .Returns("User disabled");


            var result = Cred.SetActiveStatus(userid, isEnable) as BadRequestObjectResult;

            Assert.AreNotEqual(result.StatusCode, 200);

        }

    }
}