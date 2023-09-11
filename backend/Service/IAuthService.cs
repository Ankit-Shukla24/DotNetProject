using backend.Models;

namespace backend.Service
{
    public interface IAuthService
    {
        public Admin GetAdminDetail(AdminViewModel login);
    }
}
