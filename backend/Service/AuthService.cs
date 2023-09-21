using backend.Service;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Azure.Core;
using System.IdentityModel.Tokens.Jwt;

namespace backend.Service
{
    public class AuthService : IAuthService<Credential>
    {
        private readonly ICredentialDataProvider<Credential> _CredentialDataProvider;
        public AuthService(ICredentialDataProvider<Credential> CredentialDataProvider)
        {
            _CredentialDataProvider = CredentialDataProvider;
        }
        public Credential GetAdminDetail(CredentialViewModel login)
        {
            Credential user = null;
            user = _CredentialDataProvider.GetAdminDetail(login);
            return user;
        }

        public string ChangePassword(string username,string oldpassword,string newpassword)
        {

            var credential = _CredentialDataProvider.GetCredential(username);

            if (credential==null) return "Invalid UserName";
            if (!SecretHasher.Verify(oldpassword,credential.Password)) return "Old Password doesn't match with existing Password";

            return _CredentialDataProvider.ChangePassword(username, oldpassword, newpassword).ToString();
        }
    }
}
