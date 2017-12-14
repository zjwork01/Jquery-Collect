using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JQuery插件集合.Controllers
{
    public class HomeController : Controller
    {
        
        public ActionResult Index()
        {
            SetTDK("首页");
            return View();
        }
        //日期选择
        public ActionResult DateShow()
        {
            SetTDK("日期选择器");
            return View();
        }

        //富文本编辑器
        public ActionResult KindEditor()
        {
            SetTDK("富文本编辑器");
            return View();
        }

        //图片上传
        public ActionResult ImageUpload()
        {
            SetTDK("图片上传");
            return View();
        }

        //地区选择
        public ActionResult AreaList()
        {
            SetTDK("地区选择");
            return View();
        }


        public void SetTDK(string title)
        {
            ViewBag.Title = title;
        }

    }
}
