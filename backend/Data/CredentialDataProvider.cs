using backend.Models;

namespace backend.Data
{
    public class CredentialDataProvider:ICredentialDataProvider<Credential>
    {
        private readonly PrjContext _context;

        public CredentialDataProvider(PrjContext context)
        {
            _context = context;
        }
        public Credential GetAdminDetail(CredentialViewModel login)
        {
            return _context.Credentials.SingleOrDefault(x => x.UserId == login.UserName && x.Password == login.Password);
        }
    }
}
