using backend.Models;

namespace backend.Service
{
    public interface IAuthService<Credential>
    {
        public Credential GetAdminDetail(CredentialViewModel login);
    }
}
