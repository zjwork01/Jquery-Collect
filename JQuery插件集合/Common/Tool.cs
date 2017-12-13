using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace JQuery插件集合.Common
{
    public class Tool
    {
        public static string Json(object data)
        {
            try
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                return serializer.Serialize(data);
            }
            catch
            {
                return "";
            }
        }

        public static string SetSaveFilePath()
        {
            return "../Upload/Images/";
        }
    }
}