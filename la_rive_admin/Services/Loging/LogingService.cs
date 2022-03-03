using System.Linq;
using la_rive_admin.Models;
using la_rive_admin.Services.Db;

namespace la_rive_admin.Services.Loging
{
    public class LogingService : ILogingService
    {
        private readonly MyDbContext dbContext;

        public LogingService(MyDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public User GetUser(string userName)
        {
            return this.dbContext.Users.FirstOrDefault(u => u.UserName == userName);
        }
    }
}
