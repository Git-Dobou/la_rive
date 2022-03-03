using Microsoft.EntityFrameworkCore;

namespace la_rive_admin.Services.Db
{
    public class MyDbContext : DbContext
    {
        public DbSet<Models.Order> Orders { get; set; }
        public DbSet<Models.Item> Items { get; set; }
        public DbSet<Models.Category> Categories { get; set; }
        public DbSet<Models.User> Users { get; set; }

        public MyDbContext(DbContextOptions<MyDbContext> options)
        : base(options)
        {
            this.Database.EnsureCreated();
        }

        public MyDbContext() { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
