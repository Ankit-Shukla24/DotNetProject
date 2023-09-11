using backend.Models;

namespace backend.Data
{
    public interface IAdmindataProvider
    {
        public Admin GetAdminDetail(AdminViewModel login);
    }
}
