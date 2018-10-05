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
    public class LoanController : Controller
    {
        DAL_Loan _dalLoan = new DAL_Loan();
        //
        // GET: /Loan/
        public ActionResult Index()
        {
            ViewBag.Title = "EntryLoan";
            return View();
        }

        [HttpPost]
        public ActionResult InsertLoanInfo(LoanBase_t loan)
        {
            var response = new DBResponse();
            try
            {
                var job = _dalLoan.InsertLoanBase_t(loan);

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

        //
        // View: /Loan/
        public ActionResult LoanView()
        {
            ViewBag.Title = "ViewLoan";
            return View();
        }

        [HttpPost]
        public ActionResult ViewLoanInfo(LoanViewRequest request)
        {
            var response = new LoanViewResponse();
            try
            {
                var job = _dalLoan.LoanInformationView();

                if (job.Any())
                {
                    response.LoanList = job.ToList();
                    response.StatusCode = "200";
                    response.StatusMessage = "Success";
                }
                else
                {
                    response.StatusCode = "404";
                    response.StatusMessage = "No available job";
                }
            }
            catch (Exception ex)
            {
                response.StatusCode = "500";
                response.StatusMessage = ex.Message.ToString();
            }
            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            return Json(JsonConvert.SerializeObject(response, camelCaseFormatter), JsonRequestBehavior.AllowGet);
        }
	}
}