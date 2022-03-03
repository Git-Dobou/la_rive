using System.Collections.Generic;
using la_rive_admin.Services.Order;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace la_rive_admin.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly ILogger<OrdersController> _logger;
        private readonly IOrderService _orderService;

        public OrdersController(ILogger<OrdersController> logger,
            IOrderService orderService)
        {
            _logger = logger;
            _orderService = orderService;
        }

        [HttpGet("all")]
        public IEnumerable<Models.Order> GetAll()
        {
            _logger.LogDebug("Get all orders");
            return _orderService.GetAll();
        }

        [HttpPost("new")]
        public IEnumerable<Models.Order> AddOrder(Models.Order order)
        {
            _orderService.Add(order);
            return _orderService.GetAll();
        }

        [HttpPost("update")]
        public IEnumerable<Models.Order> UpdateOrder(Models.Order order)
        {
            _orderService.Update(order);
            return _orderService.GetAll();
        }

        [HttpPost("delete")]
        public void DeleteOrder(Models.Order order)
        {
            _orderService.Delete(order);
        }
    }
}
