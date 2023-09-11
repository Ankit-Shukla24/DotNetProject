using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionhistoriesController : ControllerBase
    {
        private readonly PrjContext _context;

        public TransactionhistoriesController(PrjContext context)
        {
            _context = context;
        }

        // GET: api/Transactionhistories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transactionhistory>>> GetTransactionhistories()
        {
          if (_context.Transactionhistories == null)
          {
              return NotFound();
          }
            return await _context.Transactionhistories.ToListAsync();
        }

        // GET: api/Transactionhistories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Transactionhistory>> GetTransactionhistory(int id)
        {
          if (_context.Transactionhistories == null)
          {
              return NotFound();
          }
            var transactionhistory = await _context.Transactionhistories.FindAsync(id);

            if (transactionhistory == null)
            {
                return NotFound();
            }

            return transactionhistory;
        }

        // PUT: api/Transactionhistories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransactionhistory(int id, Transactionhistory transactionhistory)
        {
            if (id != transactionhistory.TransactionId)
            {
                return BadRequest();
            }

            _context.Entry(transactionhistory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransactionhistoryExists(id))
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

        // POST: api/Transactionhistories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Transactionhistory>> PostTransactionhistory(Transactionhistory transactionhistory)
        {
          if (_context.Transactionhistories == null)
          {
              return Problem("Entity set 'PrjContext.Transactionhistories'  is null.");
          }
            _context.Transactionhistories.Add(transactionhistory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTransactionhistory", new { id = transactionhistory.TransactionId }, transactionhistory);
        }

        // DELETE: api/Transactionhistories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransactionhistory(int id)
        {
            if (_context.Transactionhistories == null)
            {
                return NotFound();
            }
            var transactionhistory = await _context.Transactionhistories.FindAsync(id);
            if (transactionhistory == null)
            {
                return NotFound();
            }

            _context.Transactionhistories.Remove(transactionhistory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TransactionhistoryExists(int id)
        {
            return (_context.Transactionhistories?.Any(e => e.TransactionId == id)).GetValueOrDefault();
        }
    }
}
