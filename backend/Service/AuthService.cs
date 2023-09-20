using backend.Service;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Service
{
    public class AuthService : IAuthService
    {
        private readonly CredentialDataProvider _AdminDataProvider;
        public AuthService(CredentialDataProvider AdminDataProvider)
        {
            _AdminDataProvider = AdminDataProvider;
        }
        public Credential GetAdminDetail(CredentialViewModel login)
        {
            Credential user = null;
            user = _AdminDataProvider.GetAdminDetail(login);
            return user;
        }

        public Task<ActionResult<string>> ChangePassword(string userName, string password)
        {
            return _AdminDataProvider.ChangePassword(userName, password);
        }
    }
}
