using System.ComponentModel.DataAnnotations.Schema;

namespace la_rive_admin.Models
{
    public class ItemModel : Item
    {        
        public virtual Category Category { get; set; }
        public Order Order { get; set; }
    }
}
