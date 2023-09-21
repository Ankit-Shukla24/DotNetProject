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
        private readonly ICredentialDataProvider<Credential> _AdminDataProvider;
        public AuthService(ICredentialDataProvider<Credential> AdminDataProvider)
        {
            _AdminDataProvider = AdminDataProvider;
        }
        public Credential GetAdminDetail(CredentialViewModel login)
        {
            Credential user = null;
            user = _AdminDataProvider.GetAdminDetail(login);
            return user;
        }

        public string ChangePassword(string username,string oldpassword,string newpassword)
        {

            var credential = _AdminDataProvider.GetCredential(username);

            if (credential==null) return "Invalid UserName";
            if (SecretHasher.Verify(credential.Password,oldpassword)) return "Old Password doesn't match with existing Password";

            return _AdminDataProvider.ChangePassword(username, oldpassword, newpassword).ToString();
        }
    }
}
