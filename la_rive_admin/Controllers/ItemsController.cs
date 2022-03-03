using System.Collections.Generic;
using la_rive_admin.Services.Json.Writer;
using la_rive_admin.Services.Item;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace la_rive_admin.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly ILogger<ItemsController> _logger;
        private readonly IItemService _itemService;

        public ItemsController(ILogger<ItemsController> logger,
            IItemService itemService)
        {
            _logger = logger;
            _itemService = itemService;
        }

        [HttpGet("all")]
        public IEnumerable<Models.Item> GetAll()
        {
            _logger.LogDebug("Get all items");
            return _itemService.GetAll();
        }

        [HttpPost("new")]
        public bool AddOrder(Models.ItemModel item)
        {
            try
            {
                var i = new Models.Item
                {
                    OrderId = item.Order.Id,
                    CategoryId = item.Category.Id,
                    Id = item.Id,
                    PayAmount = item.PayAmount,
                    SellAmount = item.SellAmount,
                    ItemName = item.ItemName,
                    ItemNr = item.ItemNr,
                    AvailableCount = item.AvailableCount,
                    Count = item.Count,
                    ImgData = item.ImgData,
                    Size = item.Size,
                };

                _itemService.Add(i);
                return true;
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex.Message);
                return false;
            }
        }

        [HttpPost("update")]
        public bool UpdateOrder(Models.ItemModel item)
        {
            try
            {
                var i = new Models.Item
                {
                    OrderId = item.Order.Id,
                    CategoryId = item.Category.Id,
                    Id = item.Id,
                    PayAmount = item.PayAmount,
                    SellAmount = item.SellAmount,
                    ItemName = item.ItemName,
                    ItemNr = item.ItemNr,
                    AvailableCount = item.AvailableCount,
                    Count = item.Count,
                    ImgData = item.ImgData,
                    Size = item.Size,
                };

                _itemService.Update(i);
                return true;
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex.Message);
                return false;
            }
        }

        [HttpPost("delete")]
        public bool DeleteItem(Models.ItemModel item)
        {
            try
            {
                var i = new Models.Item
                {
                    OrderId = item.Order.Id,
                    CategoryId = item.Category.Id,
                    Id = item.Id,
                    PayAmount = item.PayAmount,
                    SellAmount = item.SellAmount,
                    ItemName = item.ItemName,
                    ItemNr = item.ItemNr,
                    AvailableCount = item.AvailableCount,
                    Count = item.Count,
                    ImgData = item.ImgData,
                    Size = item.Size,
                };

                _itemService.Delete(i);
                return true;
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex.Message);
                return false;
            }
        }
    }
}
