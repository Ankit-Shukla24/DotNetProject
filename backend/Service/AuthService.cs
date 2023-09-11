using backend.Service;
using backend.Data;
using backend.Models;
namespace backend.Service
{
    public class AuthService : IAuthService
    {
        private readonly AdminDataProvider _AdminDataProvider;
        public AuthService(AdminDataProvider AdminDataProvider)
        {
            _AdminDataProvider = AdminDataProvider;
        }
        public Admin GetAdminDetail(AdminViewModel login)
        {
            Admin user = null;
            user = _AdminDataProvider.GetAdminDetail(login);
            return user;
        }
    }
}
