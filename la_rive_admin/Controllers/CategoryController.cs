using System;
using System.Collections.Generic;
using la_rive_admin.Services.Category;
using la_rive_admin.Services.Json.Writer;
using la_rive_admin.Services.Order;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace la_rive_admin.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ILogger<OrdersController> _logger;
        private readonly ICategoryService _categoryService;

        public CategoryController(ILogger<OrdersController> logger,
            ICategoryService categoryService)
        {
            _logger = logger;
            _categoryService = categoryService;
        }

        [HttpGet("get")]
        public Models.CategoryModel GetPrincipal()
        {
            _logger.LogDebug("Get categories");
            return _categoryService.GetPrincipal();
        }
    }
}
