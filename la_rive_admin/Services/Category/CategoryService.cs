using System;
using System.Collections.Generic;
using System.Linq;
using la_rive_admin.Models.Database;
using la_rive_admin.Services.Db;
using Microsoft.Extensions.Options;

namespace la_rive_admin.Services.Category
{
    public class CategoryService : ICategoryService
    {
        private List<Models.Category> _categories;
        private Models.CategoryModel _categoryModel;
        private readonly MyDbContext dbContext;

        public CategoryService(MyDbContext dbContext,
            IOptions<DatabaseSettings> databaseSettings)
        {
            this.dbContext = dbContext;
        }

        private void Init()
        {
            _categoryModel = new Models.CategoryModel()
            {
                Category = this.dbContext.Categories.FirstOrDefault(cat => cat.Id == "5817b6e2-7b2f-4e7a-b363-40a27a120c60"),
                Sub = new List<Models.CategoryModel>()
            };

            var cats = this.dbContext.Categories.ToList();
            AddRangeRecursive(_categoryModel, cats);
        }

        private void AddRangeRecursive(Models.CategoryModel category, IEnumerable<Models.Category> categories)
        {
            var tmpCategories = categories.Where(c => c.Parent?.Equals(category.Category.Id) == true)?.ToList();
            if (tmpCategories?.Any() == false)
                return;

            category.Sub.AddRange(tmpCategories.Select(t => new Models.CategoryModel { Category = t, Parent = category.Category, Sub = new List<Models.CategoryModel>() }));
            foreach (var cat in category.Sub)
            {
                AddRangeRecursive(cat, categories);
            }
        }

        public void Update(Models.Category category)
        {
            this.dbContext.Categories.Update(category);
        }

        public Models.Category Get(string name)
        {
            return _categories.FirstOrDefault(c => name.Equals(c.Name, StringComparison.OrdinalIgnoreCase));
        }

        public void Add(Models.Category category)
        {
            this.dbContext.Categories.Add(category);
        }

        public void Delete(Models.Category category)
        {
            this.dbContext.Categories.Remove(category);
        }

        public Models.CategoryModel GetPrincipal()
        {
            Init();
            return _categoryModel;
        }
    }
}
