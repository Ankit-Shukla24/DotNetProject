using backend.Models;

namespace backend.Data
{
    public interface ICredentialDataProvider
    {
        public Credential GetAdminDetail(CredentialViewModel login);
    }
}
