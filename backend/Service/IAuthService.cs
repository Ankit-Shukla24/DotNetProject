using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Service
{
    public interface IAuthService
    {
        public Credential GetAdminDetail(CredentialViewModel login);
        public Task<ActionResult<string>> ChangePassword(string userName, string password);
    }
}
