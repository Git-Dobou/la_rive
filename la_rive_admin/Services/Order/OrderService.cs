using System;
using System.Collections.Generic;
using System.Linq;
using la_rive_admin.Services.Db;

namespace la_rive_admin.Services.Order
{
    public class OrderService : IOrderService
    {
        private List<Models.Order> _orders;

        private readonly MyDbContext _dbContext;

        public OrderService(MyDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public Models.Order Get(string id)
        {
            GetAll();
            return _orders?.Find(order => order.Id.Equals(id, StringComparison.OrdinalIgnoreCase));
        }

        public void Add(Models.Order order)
        {
            this._dbContext.Orders.Add(order);
            this._dbContext.SaveChanges();
        }

        public List<Models.Order> GetAll()
        {
            _orders = new List<Models.Order>();
            _orders = this._dbContext.Orders.ToList();

            return _orders;
        }

        public void Update(Models.Order order)
        {
            this._dbContext.Orders.Update(order);
            this._dbContext.SaveChanges();
        }

        public void Delete(Models.Order order)
        {
            this._dbContext.Orders.Remove(order);
            this._dbContext.SaveChanges();
        }
    }
}
