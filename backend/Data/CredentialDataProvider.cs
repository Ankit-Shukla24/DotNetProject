using Azure.Core;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Elfie.Model.Strings;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol.Plugins;
using System.IdentityModel.Tokens.Jwt;

namespace backend.Data
{
    public class CredentialDataProvider: ICredentialDataProvider<Credential>
    {
        private readonly PrjContext _context;

        public CredentialDataProvider(PrjContext context)
        {
            _context = context;
        }
        public Credential GetAdminDetail(CredentialViewModel login)
        {
            
                var cred = _context.Credentials.SingleOrDefault(x => x.UserId == login.UserName);
                if (SecretHasher.Verify(login.Password, cred.Password)) return cred;
                else return null;
            
           
        }

        public  Credential GetCredential(string username)
        {
           
            return  _context.Credentials.SingleOrDefault(x => x.UserId == username);
        }

        public String ChangePassword(string userName, string oldpassword,string newpassword)
        {
            var transaction = _context.Database.BeginTransaction();
            try
            {
                var credential =  _context.Credentials.SingleOrDefault(x => x.UserId == userName);
               

                credential.Password = SecretHasher.Hash(newpassword);
                _context.Credentials.Update(credential);

                 _context.SaveChanges();
                transaction.Commit();
                return "Password changed successfully";
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return ex.ToString();
            }
        }

    }
}
