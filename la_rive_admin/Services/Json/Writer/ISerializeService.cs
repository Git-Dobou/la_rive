namespace la_rive_admin.Services.Json.Writer
{
    public interface ISerializeService
    {
        string Serialize<T>(T obj);
    }
}