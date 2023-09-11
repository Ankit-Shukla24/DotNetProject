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
    public class AdminsController : ControllerBase
    {
            private readonly IConfiguration _config;
            private readonly AdminDataProvider _AdminDataProvider;


            public AdminsController(IConfiguration config, AdminDataProvider AdminDataProvider)
            {
                _config = config;
                _AdminDataProvider = AdminDataProvider;
            }
            [AllowAnonymous]
            [HttpPost]
            public IActionResult Login(AdminViewModel login)
            {
                IActionResult response = Unauthorized();
                var admin = Authenticateadmin(login);

                if (admin != null)
                {
                    var tokenString = GenerateJSONWebToken(admin);

                    response = Ok(new LoginResponse { token = tokenString, Admin_Id = login.UserName });
                }

                return response;
            }

            private string GenerateJSONWebToken(Admin adminInfo)
            {

                if (adminInfo is null)
                {
                    throw new ArgumentNullException(nameof(adminInfo));
                }
                List<Claim> claims = new List<Claim>();
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
                claims.Add(new Claim("Username", adminInfo.UserName));
                var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                  _config["Jwt:Issuer"],
                  claims,
                  expires: DateTime.Now.AddMinutes(2),
                  signingCredentials: credentials);

                return new JwtSecurityTokenHandler().WriteToken(token);
            }

            private Admin Authenticateadmin(AdminViewModel login)
            {
                Admin admin = _AdminDataProvider.GetAdminDetail(login);
                return admin;
            }
    }
}
