namespace la_rive_admin.Services.Category
{
    public interface ICategoryService
    {
        Models.Category Get(string nr);
        void Add(Models.Category order);
        void Update(Models.Category category);
        void Delete(Models.Category category);
        Models.CategoryModel GetPrincipal();
    }
}
