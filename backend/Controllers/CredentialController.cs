using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using NuGet.Protocol.Plugins;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Data;
using backend.Service;


namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CredentialsController : ControllerBase
    {
            private readonly IConfiguration _config;
            private readonly IAuthService<Credential> _authService;


            public CredentialsController(IConfiguration config, IAuthService<Credential> AuthService)
            {
                _config = config;
                _authService = AuthService;
            }
            [AllowAnonymous]
            [HttpPost]
            public IActionResult Login(CredentialViewModel login)
            {
                IActionResult response = Unauthorized();
                var admin = Authenticateadmin(login);
            
            if (admin != null)
            {
                if ((bool)!admin.IsEnabled) return BadRequest("User is currently disabled. Please contact admin");
                var tokenString = GenerateJSONWebToken(admin);

                if (admin.CustomerId==null)
                    response = Ok(new LoginResponse { Token = tokenString, UserId= login.UserName, UserType="Admin", CustomerId=admin.CustomerId.ToString() });
                else
                    response = Ok(new LoginResponse { Token = tokenString, UserId= login.UserName, UserType="Customer", CustomerId=admin.CustomerId.ToString() });
            }
            else
            {
                return StatusCode(201, "Wrong credentials");
            }

                return response;
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
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
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
                var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                  _config["Jwt:Issuer"],
                  claims,
                  expires: DateTime.Now.AddMinutes(20000),
                  signingCredentials: credentials);
                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return null;
            }
              
            }

            private Credential Authenticateadmin(CredentialViewModel login)
            {
                Credential admin = _authService.GetAdminDetail(login);
                return admin;
            }
        [Authorize]
        [HttpPost]
        [Route("ChangePassword")]

            public string passwordchange( string OldPassword, string NewPassword)
            {
            string authHeader = Request.Headers["Authorization"];
            var token = authHeader.Split(' ', 2)[1];
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(token);
            var tokenS = handler.ReadToken(token) as JwtSecurityToken;
            string UserName = tokenS.Claims.First(claim => claim.Type == "Username").Value;
            return _authService.ChangePassword(UserName,OldPassword,NewPassword);   
            }


        [Authorize]
        [HttpPost]
        [Route("activity")]

        public IActionResult SetActiveStatus(string customerId, Boolean status)
        {
            string authHeader = Request.Headers["Authorization"];
            var token = authHeader.Split(' ', 2)[1];
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(token);
            var tokenS = handler.ReadToken(token) as JwtSecurityToken;

            var userType = tokenS.Claims.First(claim => claim.Type == "UserType").Value;

            if(userType!="Admin")
            {
                return BadRequest("User access denied");
            }
            return Ok(_authService.ChangeActivityStatus(customerId, status));

        }
    }
}
