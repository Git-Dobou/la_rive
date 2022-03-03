using System.ComponentModel.DataAnnotations.Schema;

namespace la_rive_admin.Models
{
    [Table("Item")]
    public class Item
    {
        public Item()
        {
        }

        public string Id { get; set; }

        public string ItemNr { get; set; }
        public string ItemName { get; set; }
        public double PayAmount { get; set; }
        public double SellAmount { get; set; }
        public int Count { get; set; }
        public int AvailableCount { get; set; }
        public string ImgData { get; set; }
        public string Size { get; set; }

        public string CategoryId { get; set; }
        public string OrderId { get; set; }

    }
}
