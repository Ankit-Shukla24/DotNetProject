using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using backend.Service;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles ="Admin,Customer")]
    public class TransactionhistoriesController : ControllerBase
    {
        private readonly PrjContext _context;
        private readonly ITransactionHistoryService _transactionHistoryService;
        public TransactionhistoriesController(PrjContext context, ITransactionHistoryService transactionHistoryService)
        {
            _context = context;
            _transactionHistoryService = transactionHistoryService;
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
        [HttpGet("statement")]
        public async Task<ActionResult<Transactionhistory>> GetTransactionhistoryByAccountId(int limit)
        {

            string authHeader = Request.Headers["Authorization"];
            return Ok(_transactionHistoryService.GetTransactionHistoriesByAccountId(limit, authHeader));

        }

    
    }
}
