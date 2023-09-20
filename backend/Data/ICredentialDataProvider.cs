using backend.Models;

namespace backend.Data
{
    public interface ICredentialDataProvider<Credential>
    {
        public Credential GetAdminDetail(CredentialViewModel login);
    }
}
