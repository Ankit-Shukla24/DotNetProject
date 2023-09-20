using Azure.Core;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;

namespace backend.Data
{
    public class CredentialDataProvider: ControllerBase,ICredentialDataProvider
    {
        private readonly PrjContext _context;

        public CredentialDataProvider(PrjContext context)
        {
            _context = context;
        }
        public Credential GetAdminDetail(CredentialViewModel login)
        {
            return _context.Credentials.SingleOrDefault(x => x.UserId == login.UserName && x.Password == login.Password);
        }
        public async Task<ActionResult<string>> ChangePassword(string userName, string password)
        {
            var transaction = _context.Database.BeginTransaction();
            try
            {
                var credential = await _context.Credentials.FindAsync(userName);
                if (credential==null) return BadRequest("Invalid UserName");
                if (credential.Password!=password) return BadRequest("Old Password doesn't match with existing Password");

                credential.Password = password;
                _context.Credentials.Update(credential);

                await _context.SaveChangesAsync();
                transaction.Commit();
                return Ok("PIN changed successfully");
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return BadRequest(ex.ToString());
            }
        }

    }
}
