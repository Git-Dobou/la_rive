using System;
using System.Collections.Generic;

namespace la_rive_admin.Models.Database
{
    public class DatabaseSettings
    {
        public DatabaseSettings()
        { }

        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public Dictionary<string, string> CollectionNames { get; set; }
    }
}
