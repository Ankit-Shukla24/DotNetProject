using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin,Customer")]
    public class AccountsController : ControllerBase
    {
        private readonly PrjContext _context;

        public AccountsController(PrjContext context)
        {
            _context = context;
        }

        // GET: api/Accounts
        [HttpGet]
        [Authorize(Roles="Admin")]
        public async Task<ActionResult<IEnumerable<Account>>> GetAccounts()
        {
            if (_context.Accounts == null)
            {
                return NotFound();
            }
            return await _context.Accounts.ToListAsync();
        }

        // GET: api/Accounts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAccount(int id)
        {
            if (_context.Accounts == null)
            {
                return NotFound();
            }
            var account = await _context.Accounts.FindAsync(id);

            if (account == null)
            {
                return NotFound();
            }

            return account;
        }
        [HttpGet("acc/{customerId}")]
        public async Task<ActionResult<IEnumerable<Account>>> GetAccountsByCustomerID(int customerId)
        {

            var accounts = await _context.Accounts.Where(a => a.CustomerId==customerId).ToListAsync();

            return Ok(accounts);
        }
        [HttpGet]
        [Route("getBalancebyId")]
        public async Task<ActionResult<Account>> GetBalance(int id)
        {
            if (_context.Accounts == null)
            {
                return NotFound();
            }
            var account = await _context.Accounts.FindAsync(id);

            if (account == null)
            {
                return NotFound();
            }

            return Ok(account.Balance);
        }

        // PUT: api/Accounts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAccount(int id, Account account)
        {
            if (id != account.AccountId)
            {
                return BadRequest();
            }

            _context.Entry(account).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Accounts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Account>> PostAccount(Account account)
        {
            if (_context.Accounts == null)
            {
                return Problem("Entity set 'PrjContext.Accounts'  is null.");
            }
            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAccount", new { id = account.AccountId }, account);
        }

        // DELETE: api/Accounts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(int id)
        {
            if (_context.Accounts == null)
            {
                return NotFound();
            }
            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }

            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AccountExists(int id)
        {
            return (_context.Accounts?.Any(e => e.AccountId == id)).GetValueOrDefault();
        }



        [HttpPost("withdraw")]

        public async Task<IActionResult> WithdrawFromAccount(int accountNumber, int amount)
        {
            var transaction = _context.Database.BeginTransaction();
            try
            {
                var account = await _context.Accounts.FindAsync(accountNumber);
                if (account==null) return BadRequest(accountNumber+" not found");
                if (account.Balance >= amount)
                {
                    account.Balance -= amount;
                    _context.Accounts.Update(account);
                    _context.Transactionhistories.Add(new Transactionhistory(accountNumber, null, amount, DateTime.Now));
                    await _context.SaveChangesAsync();
                    transaction.Commit();
                    return Ok(account.Balance);
                }
                else
                {
                    return BadRequest("Cannot withdraw amount greater than balance");
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost("deposit")]
        public async Task<IActionResult> DepositIntoAccount(int accountNumber, int amount)
        {
            var transaction = _context.Database.BeginTransaction();
            try
            {
                var account = await _context.Accounts.FindAsync(accountNumber);
                if (account==null) return BadRequest(accountNumber+" not found");
                account.Balance += amount;
                _context.Accounts.Update(account);
                _context.Transactionhistories.Add(new Transactionhistory(null, accountNumber, amount, DateTime.Now));
                await _context.SaveChangesAsync();
                transaction.Commit();
                return Ok(account.Balance);
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return BadRequest(ex.ToString());
            }

        }

        [HttpPost("transfer")]
        public async Task<IActionResult> FundTransfer(int debitorId, int creditorId, int amount)
        {
            var transaction = _context.Database.BeginTransaction();
            try
            {
                var creditor = await _context.Accounts.FindAsync(creditorId);
                var debitor = await _context.Accounts.FindAsync(debitorId);
                if (creditor==null) return BadRequest(creditorId+" not found");
                if (debitor==null) return BadRequest(debitorId+" not found");
                if (debitor.Balance < amount)

                    return BadRequest("Cannot withdraw amount greater than balance");

                creditor.Balance += amount;
                debitor.Balance -= amount;
                _context.Accounts.Update(creditor);
                _context.Accounts.Update(debitor);

                _context.Transactionhistories.Add(new Transactionhistory(debitorId, creditorId, amount, DateTime.Now));
                await _context.SaveChangesAsync();
                transaction.Commit();
                return Ok("Funds transferred");
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return BadRequest(ex.ToString());
            }
        }
    }
}
