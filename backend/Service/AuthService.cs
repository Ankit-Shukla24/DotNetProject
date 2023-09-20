using backend.Service;
using backend.Data;
using backend.Models;
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
    }
}
