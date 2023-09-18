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

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CredentialsController : ControllerBase
    {
            private readonly IConfiguration _config;
            private readonly CredentialDataProvider _AdminDataProvider;


            public CredentialsController(IConfiguration config, CredentialDataProvider AdminDataProvider)
            {
                _config = config;
                _AdminDataProvider = AdminDataProvider;
            }
            [AllowAnonymous]
            [HttpPost]
            public IActionResult Login(CredentialViewModel login)
            {
                IActionResult response = Unauthorized();
                var admin = Authenticateadmin(login);

            if (admin != null)
            {
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

                if (adminInfo is null)
                {
                    throw new ArgumentNullException(nameof(adminInfo));
                }
                List<Claim> claims = new List<Claim>();
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
                claims.Add(new Claim("Username", adminInfo.UserId));
            if (adminInfo.CustomerId==null)
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
                  expires: DateTime.Now.AddMinutes(2),
                  signingCredentials: credentials);

                return new JwtSecurityTokenHandler().WriteToken(token);
            }

            private Credential Authenticateadmin(CredentialViewModel login)
            {
                Credential admin = _AdminDataProvider.GetAdminDetail(login);
                return admin;
            }
    }
}
