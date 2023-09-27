using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using System.Net;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using backend.Service;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Microsoft.Identity.Client;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin,Customer")]
    public class AccountsController : ControllerBase
    {
        private readonly PrjContext _context;
        private readonly IAccountService _accountService;

        public AccountsController(PrjContext context,IAccountService AccountService)
        {
            _context = context;
            _accountService = AccountService;
        }

        // GET: api/Accounts
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<Account>>> GetAccounts()
        {
            return _accountService.GetAccounts();
        }

        // GET: api/Accounts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAccount(int id)
        {
           return _accountService.GetAccountDetailsByAccountId(id);
        }
        [HttpGet("balance")]
        public async Task<ActionResult<IEnumerable<Account>>> GetUserBalance()
        {
            string authHeader = Request.Headers["Authorization"];
            var customerId = _accountService.GetCustomerFromHeader(authHeader);
            var account = _accountService.GetAccountDetailsByCustomerId(customerId);

            return Ok(account.Balance);
        }

       
        [HttpPost]
        public async Task<ActionResult<Account>> PostAccount(Account account)
        {
            return Ok(_accountService.CreateAccount(account));
        }

   


        [HttpPost("withdraw")]

        public async Task<IActionResult> WithdrawFromAccount(string currency, int amount,string pin)
        {
            string authHeader = Request.Headers["Authorization"];
            return Ok(_accountService.WithdrawFromAccount(currency, amount, pin, authHeader));
        }

        [HttpPost("changePin")]

        public async Task<IActionResult> PinChange(string oldPin, string newPin)
        {

            string authHeader = Request.Headers["Authorization"];
            return Ok(_accountService.PinChange(oldPin,newPin,authHeader));
        }
        [HttpPost("deposit")]
        public async Task<IActionResult> DepositIntoAccount(string currency, decimal amount,string pin)
        { 
                

                string authHeader = Request.Headers["Authorization"];
                return Ok(_accountService.DepositIntoAccount(currency,amount, pin, authHeader));


            }

        [HttpPost("transfer")]
        public async Task<IActionResult> FundTransfer(string currency,int creditorId, decimal amount,string pin)
        {
            string authHeader = Request.Headers["Authorization"];
            return Ok(_accountService.FundTransfer(currency,creditorId,amount,pin,authHeader));
        }

        //Remove if not required 
        [HttpPut("{id}")]
       
        public async Task<ActionResult<Account>> PutAccount(int id,AccountViewModel account)

        {
            account.AccountId = id;
            return Ok(_accountService.ChangeAccountDetails(account));
        }


    }
}
