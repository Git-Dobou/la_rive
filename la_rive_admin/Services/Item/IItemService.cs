using System.Collections.Generic;

namespace la_rive_admin.Services.Item
{
    public interface IItemService
    {
        List<Models.ItemModel> GetAll();
        Models.Item Get(string nr);
        void Add(Models.Item item);
        void Update(Models.Item item);
        void Delete(Models.Item item);
    }
}
