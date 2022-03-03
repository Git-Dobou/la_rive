using Microsoft.EntityFrameworkCore;

namespace la_rive_admin.Models
{
    public class UserContext
    {
        public DbSet<User> Users { get; set; }
    }
}
