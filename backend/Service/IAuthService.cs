using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Service
{
    public interface IAuthService<Credential>
    {
        public Credential GetAdminDetail(CredentialViewModel login);
        public string ChangePassword(string username, string oldpassword, string newpassword);

        public string ChangeActivityStatus(string username, Boolean status);
    }
}
