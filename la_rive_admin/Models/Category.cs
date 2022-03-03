using System.ComponentModel.DataAnnotations.Schema;

namespace la_rive_admin.Models
{
    [Table("ItemsCategory")]
    public class Category
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Parent { get; set; }
    }
}
