using backend.Models;

namespace backend.Data
{
    public class AdminDataProvider:IAdmindataProvider
    {
        private readonly PrjContext _context;

        public AdminDataProvider(PrjContext context)
        {
            _context = context;
        }
        public Admin GetAdminDetail(AdminViewModel login)
        {
            return _context.Admins.SingleOrDefault(x => x.UserName == login.UserName && x.Password == login.Password);
        }
    }
}
