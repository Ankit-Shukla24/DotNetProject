using backend.Service;
using backend.Data;
using backend.Models;
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
    }
}
