using System;
using System.Collections.Generic;
using System.Linq;
using la_rive_admin.Services.Db;

namespace la_rive_admin.Services.Item
{
    public class ItemService : IItemService
    {
        private List<Models.ItemModel> _items;

        private readonly MyDbContext _dbContext;

        public ItemService(MyDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public Models.Item Get(string nr)
        {
            GetAll();
            return _items?.Find(order => order.ItemNr.Equals(nr, StringComparison.OrdinalIgnoreCase));
        }

        public void Add(Models.Item item)
        {
            this._dbContext.Items.Add(item);
            this._dbContext.SaveChanges();
        }

        public List<Models.ItemModel> GetAll()
        {
            _items = new List<Models.ItemModel>();
            var a = this._dbContext.Items.ToList();
            _items = a.Select(a => new Models.ItemModel
            {
                Id = a.Id,
                PayAmount = a.PayAmount,
                SellAmount = a.SellAmount,
                ItemName = a.ItemName,
                ItemNr = a.ItemNr,
                AvailableCount = a.AvailableCount,
                Category = _dbContext.Categories.FirstOrDefault(c => c.Id == a.CategoryId),
                Count = a.Count,
                ImgData = a.ImgData,
                Size = a.Size,
                Order = _dbContext.Orders.FirstOrDefault(o => o.Id == a.OrderId)
            }).ToList();

            return _items;
        }

        public void Update(Models.Item item)
        {
            //this._dbContext.Items.Update(item);
            var i = this._dbContext.Items.FirstOrDefault(x => x.Id == item.Id);
            this._dbContext.Remove(i);

            this._dbContext.Items.Add(item);
            this._dbContext.SaveChanges();
        }

        public void Delete(Models.Item item)
        {
            this._dbContext.Items.Remove(item);
            this._dbContext.SaveChanges();
        }
    }
}
