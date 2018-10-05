using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
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
    public class CompanyController : Controller
    {
        DAL_Company _dalCompany = new DAL_Company();
        //
        // GET: /Company/
        public JsonResult GetCompanyList()
        {
            var list = _dalCompany.CompanyList();

            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            var result = Json(JsonConvert.SerializeObject(list, camelCaseFormatter), JsonRequestBehavior.AllowGet);
            return result;
        }

        private string uploadPath = Convert.ToString(ConfigurationManager.AppSettings["ImagePath"]);

        public ActionResult Index()
        {
            ViewBag.Title = "Company";
            return View();
        }

        [HttpPost]
        public ActionResult InsertCompanyInfo()
        {
            var response = new DBResponse();
            var companyInfo = new CompanyInfo();
            try
            {
                string filename = "";
                companyInfo.Id = Convert.ToInt32(Request["Id"]);
                companyInfo.Name = Convert.ToString(Request["Name"]);
                companyInfo.Contact = Convert.ToString(Request["Contact"]);
                companyInfo.Email = Convert.ToString(Request["Email"]);
                companyInfo.Address = Convert.ToString(Request["Address"]);

                if (Request.Files.Count == 0)
                {
                    response.Id = -1;
                    response.StatusCode = "501";
                    response.StatusMessage = "Please Uplaod a file";
                }
                else
                {

                    for (int i = 0; i < Request.Files.Count; i++)
                    {
                        var file = Request.Files[i];
                        filename = companyInfo.Id + "_" + Path.GetFileName(Request.Files[i].FileName);
                        var TemporaryPath = Server.MapPath(uploadPath) + filename;
                        file.SaveAs(TemporaryPath);
                    }
                    companyInfo.LogoLocation = filename;

                    var job = _dalCompany.InsertCompany(companyInfo);

                    if (job.Any())
                    {
                        if (job.FirstOrDefault().Id > 0)
                        {
                            response.Id = job.FirstOrDefault().Id;
                            response.StatusCode = "200";
                            response.StatusMessage = "Success";
                        }
                        else
                        {
                            response.Id = -1;
                            response.StatusCode = "501";
                            response.StatusMessage = job.FirstOrDefault().StatusMessage;
                        }
                    }
                    else
                    {
                        response.StatusCode = "404";
                        response.StatusMessage = "No available job";
                    }
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
	}
}