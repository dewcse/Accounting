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
    public class VoucherController : Controller
    {
        // GET: /Voucher/
        DAL_ChartOfAccount _dalChartOfAccount = new DAL_ChartOfAccount();
        DAL_Ledger _dalLedger = new DAL_Ledger();

        #region DropDown
        public JsonResult GetChartOfAccount()
        {
            var accountList = _dalChartOfAccount.ChartOfAccountList();

            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            var result = Json(JsonConvert.SerializeObject(accountList, camelCaseFormatter), JsonRequestBehavior.AllowGet);
            return result;
        }
        public JsonResult GetCashOfAccount()
        {
            var accountList = _dalLedger.CashOfAccountList();

            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            var result = Json(JsonConvert.SerializeObject(accountList, camelCaseFormatter), JsonRequestBehavior.AllowGet);
            return result;
        }
        #endregion

        #region Journal Voucher

        public JsonResult GetJournalVoucherNo()
        {
            AccountVoucher voucher = new AccountVoucher();

            var list = _dalLedger.GetMaxVoucherNo(1);
            voucher.VoucherNo = list.FirstOrDefault().voucherNo + 1;
            voucher.VoucherType = 1;
            voucher.VoucherName = "JV-0000" + Convert.ToString(voucher.VoucherNo);
            //return voucher.t;

            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            var result = Json(JsonConvert.SerializeObject(voucher, camelCaseFormatter), JsonRequestBehavior.AllowGet);
            return result;
        }
        public ActionResult AddJournal()
        {
            ViewBag.Title = "JournalVoucherAdd";
            return View();
        }
        public ActionResult ViewJournal()
        {
            ViewBag.Title = "JournalVoucherView";
            return View();
        }

        [HttpPost]
        public ActionResult InsertJournalVoucher(LedgerInsertRequest request)
        {
            var response = new DBResponse();
            try
            {
                var job = _dalLedger.InsertLedger(request);
                if (job.FirstOrDefault().Id > 0)
                {
                    response.Id = job.FirstOrDefault().Id;
                    response.StatusCode = "200";
                    response.StatusMessage = job.FirstOrDefault().StatusMessage;
                }
                else
                {
                    response.Id = job.FirstOrDefault().Id;
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

        #endregion

        #region Payment Voucher

        public JsonResult GetPaymentVoucherNo()
        {
            AccountVoucher voucher = new AccountVoucher();

            var list = _dalLedger.GetMaxVoucherNo(2);
            voucher.VoucherNo = list.FirstOrDefault().voucherNo + 1;
            voucher.VoucherType = 2;
            voucher.VoucherName = "EV-0000" + Convert.ToString(voucher.VoucherNo);
            //return voucher.t;

            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            var result = Json(JsonConvert.SerializeObject(voucher, camelCaseFormatter), JsonRequestBehavior.AllowGet);
            return result;
        }

        public ActionResult AddPayment()
        {
            ViewBag.Title = "PaymentVoucherAdd";
            return View();
        }
        //public ActionResult ViewPayment()
        //{
        //    ViewBag.Title = "PaymentVoucherView";
        //    return View();
        //}

        [HttpPost]
        public ActionResult InsertPaymentVoucher(VoucherInsertRequest request)
        {
            var ledgerRequest = new LedgerInsertRequest();
            var response = new DBResponse();
            try
            {
                ledgerRequest.ledgerList = request.ledgerList;

                var job = _dalLedger.InsertVoucher(request);
                if (job.FirstOrDefault().Id > 0)
                {
                    _dalLedger.InsertLedger(ledgerRequest);

                    response.Id = job.FirstOrDefault().Id;
                    response.StatusCode = "200";
                    response.StatusMessage = job.FirstOrDefault().StatusMessage;
                }
                else
                {
                    response.Id = job.FirstOrDefault().Id;
                    response.StatusCode = "409";
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

        #endregion

        #region Receipt Voucher

        public JsonResult GetReceiptVoucherNo()
        {
            AccountVoucher voucher = new AccountVoucher();

            var list = _dalLedger.GetMaxVoucherNo(3);
            voucher.VoucherNo = list.FirstOrDefault().voucherNo + 1;
            voucher.VoucherType = 3;
            voucher.VoucherName = "IV-0000" + Convert.ToString(voucher.VoucherNo);
            //return voucher.t;

            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            var result = Json(JsonConvert.SerializeObject(voucher, camelCaseFormatter), JsonRequestBehavior.AllowGet);
            return result;
        }

        public ActionResult AddReceipt()
        {
            ViewBag.Title = "ReceiptVoucherAdd";
            return View();
        }
        public ActionResult ViewReceipt()
        {
            ViewBag.Title = "ReceiptVoucherView";
            return View();
        }

        [HttpPost]
        public ActionResult InsertReceiptVoucher(VoucherInsertRequest request)
        {
            var ledgerRequest = new LedgerInsertRequest();
            var response = new DBResponse();
            try
            {
                ledgerRequest.ledgerList = request.ledgerList;

                var job = _dalLedger.InsertVoucher(request);
                if (job.FirstOrDefault().Id > 0)
                {
                    _dalLedger.InsertLedger(ledgerRequest);

                    response.Id = job.FirstOrDefault().Id;
                    response.StatusCode = "200";
                    response.StatusMessage = job.FirstOrDefault().StatusMessage;
                }
                else
                {
                    response.Id = job.FirstOrDefault().Id;
                    response.StatusCode = "409";
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

        #endregion

        #region Edit/View Voucher
        public ActionResult ViewLedgerList()
        {
            ViewBag.Title = "ViewLedgerList";
            return View();
        }
        public ActionResult GetLedgerList(LedgerListViewRequest request)
        {
            var response = new LedgerListViewResponse();
            try
            {
                var job = _dalLedger.LedgerListForView(request);
                if (job.Any())
                {
                    var jobList = job.GroupBy(x => x.VoucherNo).Select(y => new LedgerListForView
                    {
                        LedgerId = y.FirstOrDefault().LedgerId,
                        TransactionDate = y.FirstOrDefault().TransactionDate,
                        VoucherNo = y.FirstOrDefault().VoucherNo,
                        VoucherType = y.FirstOrDefault().VoucherType,
                        VoucherName = y.FirstOrDefault().VoucherName,
                        Debit = y.Sum(x => x.Debit),
                        Credit = y.Sum(x => x.Credit),
                        Description = y.FirstOrDefault().Description,
                        Narration = y.FirstOrDefault().Narration,
                        Reference = y.FirstOrDefault().Reference,
                        ChartOfAccount = y.FirstOrDefault().ChartOfAccount,
                        VoucherId = y.FirstOrDefault().VoucherId,
                        CashOfAccountType = y.FirstOrDefault().CashOfAccountType,
                        CashOfAccount = y.FirstOrDefault().CashOfAccount,
                        Payable = y.FirstOrDefault().Payable,
                        Note = y.FirstOrDefault().Note,
                        Quantity = y.Sum(x => x.Quantity),
                        UnitPrice = y.Sum(x => x.UnitPrice),
                        Amount = y.FirstOrDefault().Amount
                    }).OrderByDescending(x => x.VoucherType);

                    response.StatusCode = "200";
                    response.StatusMessage = "Data fetch successfully";
                    response.LedgerListForView = jobList.ToList();
                }
                else
                {
                    response.StatusCode = "400";
                    response.StatusMessage = "No data found on selected search";
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
        public ActionResult VoucherReport()
        {
            return View();
        }
        public ActionResult VoucherReport_HTML(VoucherReportViewRequest request)
        {
            var response = new VoucherReportViewResponse();
            var headerHtml = "";
            var reportHeaderHtml = "";
            var firstSection = "";
            var table = "";
            try
            {
                var list = _dalLedger.VoucherListByType(request).ToList();
                if (list.Any())
                {
                    reportHeaderHtml = " <div align='left' class='ReportBorderL' >" +
                       "<div style='position:absolute;'>" +
                           "<img src='/UploadFiles/" + list.FirstOrDefault().LogoLocation + "' width='60' border='0' />" +
                      " </div>" +

              "<table style='width: 100%'>" +
                 "<tr>" +
                      "<td class='Company'>" + list.FirstOrDefault().CompanyName + "</td>" +
                  "</tr>" +
                  "<tr>" +
                      "<td class='Address1'>" + list.FirstOrDefault().CompanyAddress + "</td>" +
                  "</tr>" +
                 " <tr>" +
                     " <td class='Address2'>" + list.FirstOrDefault().CompanyEmail + ", " + list.FirstOrDefault().CompanyContact + "</td>" +
                  "</tr>" +
                        // "<tr>" +
                        //     "<td class='Address3'>" + list.FirstOrDefault().CompanyContact + "</td>" +
                        //" </tr>" +
                  "<tr>" +
                      "<td style='text-align: center'>" +
                          "<div align='center'>" +
                         " <div class='ReportTitle'> " + list.FirstOrDefault().Voucher + "" +
                          "</div>" +
                              "</div>" +
                      "</td>" +
                  "</tr>" +
              "</table>" +
              "<div runat='server' id='reportContent'></div>" +
              "<br />";

                    firstSection = firstSection + "</br></br> <table style='font-size:13px; background-color:#d2c8c8; width: 100%'>";
                    firstSection = firstSection + "  <tr>";
                    firstSection = firstSection + "<td style='width: 102px'><b> Transaction Date</b></td>";
                    firstSection = firstSection + "  <td style='width: 4px'><b>:</b></td>";
                    firstSection = firstSection + " <td style='width: 240px;'>" + list.FirstOrDefault().TransactionDate + "</td>";
                    firstSection = firstSection + "</tr>";

                    firstSection = firstSection + " <td style='width: 102px'><b>Reference</b></td>";
                    firstSection = firstSection + "<td style='width: 4px'><b>:</b></td>";
                    firstSection = firstSection + " <td style='width: 240px;'>" + list.FirstOrDefault().Reference + "</td>";
                    //firstSection = firstSection + " <td style='width: 102px'><b>To Line</b></td>";
                    //firstSection = firstSection + "<td style='width: 4px'><b>:</b></td>";
                    //firstSection = firstSection + " <td style='width: 240px;'>" + list.FirstOrDefault().Search_ToLine + "</td>";
                    firstSection = firstSection + "</tr></table>";

                    table = "<table  class='tableApproval' cellspacing='0' style='font-size:12px; width: 100%; '><tr>" +
                                    "<td style='font-weight:bold'>Voucher</td>" +
                                    "<td style='font-weight:bold'>Chart of Account</td>" +
                                    "<td style='font-weight:bold'>Description</td>" +
                                    "<td style='font-weight:bold'>Narration</td>" +
                                    "<td style='font-weight:bold'>Debit</td>" +
                                    "<td style='font-weight:bold'>Credit</td>" +
                                    "</tr>";

                    var itemList = list.GroupBy(x => x.LedgerId).Select(x => x.ToList());

                    int i = 0;
                    foreach (var item in itemList)
                    {
                        i++;

                        foreach (var lastItem in item)
                        {
                            table = table + "<tr><td>" + lastItem.Voucher + "</td>" +
                                            "<td>" + lastItem.ChartOfAccount + "</td>" +
                                            "<td>" + lastItem.Description + "</td>" +
                                            "<td>" + lastItem.Narration + "</td>" +
                                            "<td>" + lastItem.Debit + "</td>" +
                                            "<td>" + lastItem.Credit + "</td></tr>";
                        }
                        if (itemList.Count() == i)
                        {
                            table = table + "<tr><td colspan='4' style='font-weight:bold'>Total</td>" +
                                             "<td style='font-weight:bold'>" + list.Sum(x => x.Debit) + "</td>" +
                                             "<td style='font-weight:bold'>" + list.Sum(x => x.Credit) + "</td></tr></br>";
                        }
                    }
                    table = table + "</table>";
                    headerHtml = headerHtml + table;
                    response.StatusCode = "200";
                    response.StatusMessage = "Successfully Get Data";
                    response.Report = reportHeaderHtml + firstSection + headerHtml + "</div>";
                }
                else
                {
                    response.StatusCode = "404";
                    response.StatusMessage = "No Data Found";
                    response.Report = "";
                }
            }
            catch (Exception ex)
            {
                response.StatusCode = "500";
                response.StatusMessage = ex.Message.ToString();
            }

            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            var returnJson = Json(JsonConvert.SerializeObject(response, camelCaseFormatter), JsonRequestBehavior.AllowGet);
            returnJson.MaxJsonLength = Int32.MaxValue;
            return returnJson;
        }

        #endregion

        #region Report
        public ActionResult Reports()
        {
            ViewBag.Title = "ReportView";
            return View();
        }
        public ActionResult JournalReports()
        {
            return View();
        }
        public ActionResult TrailBalance_HTML(LedgerListViewRequest request)
        {
            var response = new VoucherReportViewResponse();
            var headerHtml = "";
            var reportHeaderHtml = "";
            var firstSection = "";
            var table = "";

            try
            {
                var list = _dalLedger.ReportTrailBalance(request).ToList();

                if (list.Any())
                {
                    reportHeaderHtml = " <div align='center' class='ReportBorderL' >" +
                       "<div style='position:absolute;'  >" +
                             "<img src='/UploadFiles/" + list.FirstOrDefault().LogoLocation + "' width='60' border='0' />" +
                      " </div>" +

                  "<table style='width: 100%'>" +
                      "<tr>" +
                          "<td class='Company'>" + list.FirstOrDefault().CompanyName + "</td>" +
                      "</tr>" +
                      "<tr>" +
                          "<td class='Address1''>" + list.FirstOrDefault().CompanyAddress + "</td>" +
                      "</tr>" +
                      " <tr>" +
                         " <td class='Address2'>" + list.FirstOrDefault().CompanyEmail + ", " + list.FirstOrDefault().CompanyContact + "</td>" +
                      "</tr>" +
                        // "<tr>" +
                        //     "<td class='Address3'" + list.FirstOrDefault().CompanyContact + "</td>" +
                        //" </tr>" +
                      "<tr>" +
                          "<td style='text-align: center'>" +
                              "<div align='center'>" +
                              "<div class='ReportTitle'>Trial Balance" +
                              "</div>" +
                                  "</div>" +
                          "</td>" +
                      "</tr>" +
                  "</table>" +
                  "<div runat='server' id='reportContent'></div>" +
                  "<br />";

                    firstSection = firstSection + "<div align='left'><table style='font-size:13px; background-color:#d2c8c8; width: 50%'>";
                    firstSection = firstSection + "  <tr>";
                    firstSection = firstSection + "<td style='width: 180px'><b> Transaction Date</b></td>";
                    firstSection = firstSection + "  <td style='width: 4px'><b>:</b></td>";
                    firstSection = firstSection + " <td style='width: 400px;'>" + list.FirstOrDefault().SearchDate + "</td>";
                    firstSection = firstSection + "</tr>";

                    //firstSection = firstSection + " <td style='width: 102px'><b>Reference</b></td>";
                    //firstSection = firstSection + "<td style='width: 4px'><b>:</b></td>";
                    //firstSection = firstSection + " <td style='width: 240px;'>" + list.FirstOrDefault().Reference + "</td>";
                    firstSection = firstSection + "</tr></table></div>";

                    if (request.voucherType == 1)
                    {

                        table = "<table  class='tableApproval' cellspacing='0' style='font-size:12px; width: 100%; '><tr>" +
                        "<td style='font-weight:bold'>Chart of Account</td>" +
                        "<td style='font-weight:bold'>Debit</td>" +
                        "<td style='font-weight:bold'>Credit</td>" +
                        "</tr>";

                        var itemList = list.GroupBy(x => x.ChartOfAccountId).Select(x => x.ToList());

                        int i = 0;
                        foreach (var item in itemList)
                        {
                            i++;
                            foreach (var lastItem in item)
                            {
                                table = table + "<tr><td>" + lastItem.ChartOfAccount + "</td>" +
                                                "<td>" + lastItem.Debit + "</td>" +
                                                "<td>" + lastItem.Credit + "</td></tr>";
                            }
                            if (itemList.Count() == i)
                            {
                                table = table + "<tr><td colspan='1' style='font-weight:bold'>Total</td>" +
                                                    "<td style='font-weight:bold'>" + list.Sum(x => x.Debit) + "</td>" +
                                                    "<td style='font-weight:bold'>" + list.Sum(x => x.Credit) + "</td></tr></br>";
                            }
                        }
                    }
                    table = table + "</table>";
                    headerHtml = headerHtml + table;
                    response.StatusCode = "200";
                    response.StatusMessage = "Successfully Get Data";
                    response.Report = reportHeaderHtml + firstSection + headerHtml + "</div>";
                }
                else
                {
                    response.StatusCode = "404";
                    response.StatusMessage = "No Data Found";
                    response.Report = "";
                }
            }
            catch (Exception ex)
            {
                response.StatusCode = "500";
                response.StatusMessage = ex.Message.ToString();
            }

            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            var returnJson = Json(JsonConvert.SerializeObject(response, camelCaseFormatter), JsonRequestBehavior.AllowGet);
            returnJson.MaxJsonLength = Int32.MaxValue;
            return returnJson;
        }
        public ActionResult IncomeStatement_HTML(LedgerListViewRequest request)
        {
            var response = new VoucherReportViewResponse();
            var headerHtml = "";
            var reportHeaderHtml = "";
            var firstSection = "";
            var table = "";

            try
            {
                var list = _dalLedger.ReportIncomeStatement(request).Where(x => x.VoucherType == 1).ToList();

                if (list.Any())
                {
                    reportHeaderHtml = " <div align='center' class='ReportBorderL' >" +
                       "<div style='position:absolute;'>" +
                          "<img src='/UploadFiles/" + list.FirstOrDefault().LogoLocation + "' width='60' border='0' />" +
                      " </div>" +

                  "<table style='width: 100%'>" +
                      "<tr>" +
                          "<td class='Company'>" + list.FirstOrDefault().CompanyName + "</td>" +
                      "</tr>" +
                      "<tr>" +
                          "<td class='Address1'>" + list.FirstOrDefault().CompanyAddress + "</td>" +
                      "</tr>" +
                      " <tr>" +
                         " <td class='Address2'>" + list.FirstOrDefault().CompanyEmail + ", " + list.FirstOrDefault().CompanyContact + "</td>" +
                      "</tr>" +
                        // "<tr>" +
                        //     "<td class='Address3'>" + list.FirstOrDefault().CompanyContact + "</td>" +
                        //" </tr>" +
                      "<tr>" +
                          "<td style='text-align: center'>" +
                              "<div align='center'>" +
                              "<div class='ReportTitle'>Income Statement" +
                              "</div>" +
                                  "</div>" +
                          "</td>" +
                      "</tr>" +
                  "</table>" +
                  "<div runat='server' id='reportContent'></div>" +
                  "<br />";

                    firstSection = firstSection + "<div align='left'><table style='font-size:13px; background-color:#d2c8c8; width: 50%'>";
                    firstSection = firstSection + "  <tr>";
                    firstSection = firstSection + "<td style='width: 180px'><b> Transaction Date</b></td>";
                    firstSection = firstSection + "  <td style='width: 4px'><b>:</b></td>";
                    firstSection = firstSection + " <td style='width: 400px;'>" + list.FirstOrDefault().SearchDate + "</td>";
                    firstSection = firstSection + "</tr></table></div>";

                    table = "<table  class='tableApproval' cellspacing='0' style='font-size:12px; width: 100%; '><tr>" +
                        "<td style='text-align: center; font-weight:bold'>Chart of Account</td>" +
                        "<td style='text-align: center; font-weight:bold'>Debit</td>" +
                        "<td style='text-align: center; font-weight:bold'>Credit</td>" +
                        "</tr>";

                    var incomeList = list.Where(y => y.GroupId == 2);
                    //headerHtml = headerHtml + "</br><div><b>Income</b></div>";
                    table = table + "<tr><td style='font-weight:bold' colspan='3'>Income</td></tr>";

                    int i = 0;
                    foreach (var item in incomeList)
                    {
                        i++;
                        //foreach (var lastItem in item)
                        //{
                        table = table + "<tr><td style='text-align: center;'>" + item.ChartOfAccount + "</td>" +
                                            "<td style='text-align: center;'>" + item.Debit + "</td>" +
                                            "<td style='text-align: center;'>" + item.Credit + "</td></tr>";
                        //}
                        if (incomeList.Count() == i)
                        {
                            table = table + "<tr><td colspan='1' style='font-weight:bold'>Total Income</td>" +
                                            "<td style='text-align: center; font-weight:bold'>" + incomeList.Sum(y => y.Debit) + "</td>" +
                                            "<td style='text-align: center; font-weight:bold'>" + incomeList.Sum(x => x.Credit) + "</td></tr></br>";
                            //+ "<tr><td colspan='3'></td></tr></br>";
                        }
                    }


                    var expenseList = list.Where(x => x.GroupId == 3);
                    //headerHtml = headerHtml + "</br><div><b>Expense</b></div>";
                    table = table + "<tr><td style='font-weight:bold' colspan='3'>Expense</td></tr>";
                    int j = 0;
                    foreach (var item1 in expenseList)
                    {
                        j++;
                        //foreach (var expenseItem in item1)
                        //{
                        table = table + "<tr><td style='text-align: center;'>" + item1.ChartOfAccount + "</td>" +
                                            "<td style='text-align: center;'>" + item1.Debit + "</td>" +
                                            "<td style='text-align: center;'>" + item1.Credit + "</td></tr>";
                        //}

                        if (expenseList.Count() == j)
                        {
                            table = table + "<tr><td colspan='1' style='font-weight:bold'>Total Expense</td>" +
                                            "<td style='text-align: center; font-weight:bold'>" + expenseList.Sum(x => x.Debit) + "</td>" +
                                            "<td style='text-align: center; font-weight:bold'>" + expenseList.Sum(x => x.Credit) + "</td></tr></br>";
                        }

                    }

                    table = table + "<tr><td colspan='3'></td></tr>";
                    //if (list.Count == j)
                    //{
                    table = table + "<tr><td colspan='2' style='font-weight:bold'>Net Income (Before Tax)</td>" +
                        //"<td style='text-align: center; font-weight:bold'>" + list.Sum(x => x.Debit) + "</td>" +
                                        "<td style='text-align: center; font-weight:bold'>" + (list.Sum(x => x.Credit) - list.Sum(x => x.Debit)) + "</td></tr></br>";
                    //}

                    table = table + "</table>";
                    headerHtml = headerHtml + table;
                    response.StatusCode = "200";
                    response.StatusMessage = "Successfully Get Data";
                    response.Report = reportHeaderHtml + firstSection + headerHtml + "</div>";
                }
                else
                {
                    response.StatusCode = "404";
                    response.StatusMessage = "No Data Found";
                    response.Report = "";
                }
            }
            catch (Exception ex)
            {
                response.StatusCode = "500";
                response.StatusMessage = ex.Message.ToString();
            }

            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            var returnJson = Json(JsonConvert.SerializeObject(response, camelCaseFormatter), JsonRequestBehavior.AllowGet);
            returnJson.MaxJsonLength = Int32.MaxValue;
            return returnJson;
        }
        public ActionResult BalanceSheet_HTML(LedgerListViewRequest request)
        {
            var response = new VoucherReportViewResponse();
            var headerHtml = "";
            var reportHeaderHtml = "";
            var firstSection = "";
            var table = "";

            try
            {
                var list = _dalLedger.ReportBalanceSheet(request).Where(x => x.VoucherType == 1).ToList();

                if (list.Any())
                {
                    reportHeaderHtml = " <div align='center' class='ReportBorderL' >" +
                       "<div style='position:absolute;'>" +
                          "<img src='/UploadFiles/" + list.FirstOrDefault().LogoLocation + "' width='60' border='0' />" +
                      " </div>" +

                  "<table style='width: 100%'>" +
                      "<tr>" +
                          "<td class='Company'>" + list.FirstOrDefault().CompanyName + "</td>" +
                      "</tr>" +
                      "<tr>" +
                          "<td class='Address1'>" + list.FirstOrDefault().CompanyAddress + "</td>" +
                      "</tr>" +
                      " <tr>" +
                         " <td class='Address2'>" + list.FirstOrDefault().CompanyEmail + ", " + list.FirstOrDefault().CompanyContact + "</td>" +
                      "</tr>" +
                        // "<tr>" +
                        //     "<td class='Address3'>" + list.FirstOrDefault().CompanyContact + "</td>" +
                        //" </tr>" +
                      "<tr>" +
                          "<td style='text-align: center'>" +
                              "<div align='center'>" +
                              "<div class='ReportTitle'>Balance Sheet" +
                              "</div>" +
                                  "</div>" +
                          "</td>" +
                      "</tr>" +
                  "</table>" +
                  "<div runat='server' id='reportContent'></div>" +
                  "<br />";

                    firstSection = firstSection + "<div align='left'><table style='font-size:13px; background-color:#d2c8c8; width: 50%'>";
                    firstSection = firstSection + "  <tr>";
                    firstSection = firstSection + "<td style='width: 180px'><b> Transaction Date</b></td>";
                    firstSection = firstSection + "  <td style='width: 4px'><b>:</b></td>";
                    firstSection = firstSection + " <td style='width: 400px;'>" + list.FirstOrDefault().SearchDate + "</td>";
                    firstSection = firstSection + "</tr></table></div>";

                    table = "<br /><table  class='tableApproval' cellspacing='0' style='font-size:12px; width: 100%; '><tr>" +
                        "<td style='text-align: center; font-weight:bold'>Chart of Account</td>" +
                        "<td style='text-align: center; font-weight:bold'>Debit</td>" +
                        "<td style='text-align: center; font-weight:bold'>Credit</td>" +
                        "</tr>";

                    var assetsList = list.Where(y => y.GroupId == 1);
                    //headerHtml = headerHtml + "</br><div><b>Income</b></div>";
                    table = table + "<tr><td style='font-weight:bold' colspan='3'>Assets</td></tr>";

                    int i = 0;
                    foreach (var item in assetsList)
                    {
                        i++;
                        //foreach (var lastItem in item)
                        //{
                        table = table + "<tr><td style='text-align: center;'>" + item.ChartOfAccount + "</td>" +
                                            "<td style='text-align: center;'>" + item.Debit + "</td>" +
                                            "<td style='text-align: center;'>" + item.Credit + "</td></tr>";
                        //}
                        if (assetsList.Count() == i)
                        {
                            table = table + "<tr><td colspan='1' style='font-weight:bold'>Total Assets</td>" +
                                            "<td style='text-align: center; font-weight:bold'>" + assetsList.Sum(y => y.Debit) + "</td>" +
                                            "<td style='text-align: center; font-weight:bold'>" + assetsList.Sum(x => x.Credit) + "</td></tr>"
                                      + "<tr><td colspan='3'></td></tr></br>";
                        }
                    }


                    var equityList = list.Where(x => x.GroupId == 4);
                    //headerHtml = headerHtml + "</br><div><b>Expense</b></div>";
                    table = table + "<tr><td style='font-weight:bold' colspan='3'>Liabilities & Equity</td></tr>";
                    int j = 0;
                    foreach (var item1 in equityList)
                    {
                        j++;
                        //foreach (var expenseItem in item1)
                        //{
                        table = table + "<tr><td style='text-align: center;'>" + item1.ChartOfAccount + "</td>" +
                                            "<td style='text-align: center;'>" + item1.Debit + "</td>" +
                                            "<td style='text-align: center;'>" + item1.Credit + "</td></tr>";
                        //}

                        if (equityList.Count() == j)
                        {
                            table = table + "<tr><td colspan='1' style='font-weight:bold'>Total Liabilities & Equity</td>" +
                                            "<td style='text-align: center; font-weight:bold'>" + equityList.Sum(x => x.Debit) + "</td>" +
                                            "<td style='text-align: center; font-weight:bold'>" + equityList.Sum(x => x.Credit) + "</td></tr></br>";
                        }

                    }

                    table = table + "</table>";
                    headerHtml = headerHtml + table;
                    response.StatusCode = "200";
                    response.StatusMessage = "Successfully Get Data";
                    response.Report = reportHeaderHtml + firstSection + headerHtml + "</div>";
                }
                else
                {
                    response.StatusCode = "404";
                    response.StatusMessage = "No Data Found";
                    response.Report = "";
                }
            }
            catch (Exception ex)
            {
                response.StatusCode = "500";
                response.StatusMessage = ex.Message.ToString();
            }

            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            var returnJson = Json(JsonConvert.SerializeObject(response, camelCaseFormatter), JsonRequestBehavior.AllowGet);
            returnJson.MaxJsonLength = Int32.MaxValue;
            return returnJson;
        }

        #endregion
	}
}