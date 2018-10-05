using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Accounts.Data.Accounts;
using Accounts.Domain.Accounts;
using Accounts.Domain.Messaging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Accounts.Web.Controllers
{
    [Authorize]
    public class ChartOfAccountController : Controller
    {
        DAL_CommonFeatures _dalCommonFeatures = new DAL_CommonFeatures();
        DAL_ChartOfAccount _dalChartOfAccount = new DAL_ChartOfAccount();

        #region DropDown

        public JsonResult GetGroupList()
        {
            var groupList = _dalCommonFeatures.GroupList();

            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            var result = Json(JsonConvert.SerializeObject(groupList, camelCaseFormatter), JsonRequestBehavior.AllowGet);
            return result;
        }

        public JsonResult GetTypeList()
        {
            var typeList = _dalCommonFeatures.TypeList();

            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            var result = Json(JsonConvert.SerializeObject(typeList, camelCaseFormatter), JsonRequestBehavior.AllowGet);
            return result;
        }

        #endregion

        //
        // GET: /ChartOfAccount/
        public JsonResult GetChartOfAccountList()
        {
            var list = _dalChartOfAccount.ChartOfAccountList();

            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            var result = Json(JsonConvert.SerializeObject(list, camelCaseFormatter), JsonRequestBehavior.AllowGet);
            return result;
        }
        public ActionResult Index()
        {
            ViewBag.Title = "ChartOfAccountAdd";
            return View();
        }

        [HttpPost]
        public ActionResult InsertChartOfAccountInfo(ChartOfAccount chart)
        {
            //var list = _dalCompany.AddCompany(company);
            var response = new DBResponse();
            try
            {
                var job = _dalChartOfAccount.InsertChartOfAccount(chart);
                if (job.FirstOrDefault().Id > 0)
                {
                    response.Id = job.FirstOrDefault().Id;
                    response.StatusCode = "200";
                    response.StatusMessage = "Data Insert Successfully";
                }
                else
                {
                    response.Id = -1;
                    response.StatusCode = "501";
                    response.StatusMessage = job.FirstOrDefault().StatusMessage;
                }

            }
            catch (Exception ex)
            {
                response.Id = -1;
                response.StatusCode = "500";
                response.StatusMessage = ex.Message.ToString();
            }
            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            return Json(JsonConvert.SerializeObject(response, camelCaseFormatter), JsonRequestBehavior.AllowGet);
        }

        //[HttpGet]
        public ActionResult EditView()
        {
            ViewBag.Title = "ChartOfAccountView";
            return View();
        }

        public ActionResult ChartOfAccountEdit()
        {
            return View();
        }
	}
}