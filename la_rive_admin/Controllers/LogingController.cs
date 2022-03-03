using System;
using System.Collections.Generic;
using la_rive_admin.Services.Category;
using la_rive_admin.Services.Json.Writer;
using la_rive_admin.Services.Loging;
using la_rive_admin.Services.Order;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace la_rive_admin.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LogingController : ControllerBase
    {
        private readonly ILogger<LogingController> _logger;
        private readonly ILogingService _logingService;

        public LogingController(ILogger<LogingController> logger,
            ILogingService logingService)
        {
            _logger = logger;
            _logingService = logingService;
        }

        [HttpPost("connect")]
        public Models.User GetUser(Models.User user)
        {
            _logger.LogDebug("Get user");
            Models.User user1 = _logingService.GetUser(user.UserName);
            return user1;
        }

        [HttpPost("new")]
        public IEnumerable<Models.Order> AddUser(Models.Order order)
        {
            return null;
        }

        [HttpPost("update")]
        public IEnumerable<Models.Order> UpdateUser(Models.Order order)
        {
            return null;
        }
    }
}
