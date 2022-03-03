using System;
using Newtonsoft.Json;

namespace la_rive_admin.Services.Json.Writer
{
    public class SerializeService : ISerializeService
    {
        public SerializeService()
        {
        }

        public string Serialize<T>(T obj)
        {
            return JsonConvert.SerializeObject(obj);
        }
    }
}
