using System.ComponentModel.DataAnnotations.Schema;

namespace la_rive_admin.Models
{
    [Table("User")]
    public class User
    {
        public User()
        {
        }

        public string Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
    }
}
