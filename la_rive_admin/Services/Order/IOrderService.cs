using System.Collections.Generic;

namespace la_rive_admin.Services.Order
{
    public interface IOrderService
    {
        List<Models.Order> GetAll();
        Models.Order Get(string nr);
        void Add(Models.Order order);
        void Update(Models.Order order);
        void Delete(Models.Order order);
    }
}
