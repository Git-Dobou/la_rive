using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace la_rive_admin.Models
{
    [Table("Category")]
    public class CategoryModel
    {
        public Category Parent { get; set; }
        public Category Category { get; set; }
        public List<CategoryModel> Sub { get; set; }
    }
}
