using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Accounts.Domain.Accounts;
using Accounts.Domain.Messaging;

namespace Accounts.Data.Accounts
{
    public class DAL_Ledger
    {
        public List<DBResponse> InsertLedger(LedgerInsertRequest request)
        {
            using (var _context = new AccountsEntities())
            {
                List<GeneralLedger> objLedger = request.ledgerList;

                var xmlLedger = new XElement("ArrayOfLedger", objLedger.Select(x => new XElement("ChildList",
                                                new XElement("Id", x.Id),
                                                new XElement("TransactionDate", x.TransactionDate),
                                                new XElement("VoucherNo", x.VoucherNo),
                                                new XElement("VoucherType", x.VoucherType),
                                                new XElement("VoucherName", x.VoucherName),
                                                new XElement("AccountCode", x.AccountCode),
                                                new XElement("Debit", x.Debit),
                                                new XElement("Credit", x.Credit),
                                                new XElement("Description", x.Description),
                                                new XElement("Narration", x.Narration),
                                                new XElement("Reference", x.Reference),
                                                new XElement("Creator", x.Creator)
                                              )));

                request.ledgerXML = xmlLedger.ToString();

                string dataList = "[Acc_InsertLedgerInfo] '" + request.ledgerXML + "'";
                var list = _context.Database.SqlQuery<DBResponse>(dataList).ToList<DBResponse>();
                return list;
            }
        }
        public List<CashOfAccount> CashOfAccountList()
        {
            using (var _context = new AccountsEntities())
            {
                string dataList = "Acc_GetCashOfAccountList";
                var list = _context.Database.SqlQuery<CashOfAccount>(dataList).ToList<CashOfAccount>();
                return list;

            }
        }
        public List<LedgerListForView> LedgerListForView(LedgerListViewRequest request)
        {
            using (var _context = new AccountsEntities())
            {
                string dataList = "[Acc_LedgerInfoForView] '" + request.fromDate + "','" + request.toDate + "','" + request.voucherType + "'";
                var list = _context.Database.SqlQuery<LedgerListForView>(dataList).ToList<LedgerListForView>();
                return list;

            }
        }
        public List<DBResponse> InsertVoucher(VoucherInsertRequest request)
        {
            using (var _context = new AccountsEntities())
            {
                List<VoucherList> objVoucher = request.voucherList;

                var xmlLedger = new XElement("ArrayOfVoucher", objVoucher.Select(x => new XElement("ChildList",
                                                new XElement("Id", x.Id),
                                                new XElement("VoucherNo", x.VoucherNo),
                                                new XElement("VoucherType", x.VoucherType),
                                                new XElement("VoucherName", x.VoucherName),
                                                new XElement("CashOfAccountType", x.CashOfAccountType),
                                                new XElement("Payable", x.Payable),
                                                new XElement("Note", x.Note),
                                                new XElement("AccountCode", x.AccountCode),
                                                new XElement("Description", x.Description),
                                                new XElement("Quantity", x.Quantity),
                                                new XElement("UnitPrice", x.UnitPrice),
                                                new XElement("Amount", x.Amount)
                                              )));

                request.voucherXml = xmlLedger.ToString();

                string dataList = "[Acc_InsertVoucherInfo] '" + request.voucherXml + "'";
                var list = _context.Database.SqlQuery<DBResponse>(dataList).ToList<DBResponse>();
                return list;
            }
        }
        public List<VoucherNo> GetMaxVoucherNo(int VoucherType)
        {
            using (var _context = new AccountsEntities())
            {
                //int VoucherCode = 0;
                var query = "[Acc_GetMaxVoucherNo] '" + VoucherType + "'";
                var list = _context.Database.SqlQuery<VoucherNo>(query).ToList<VoucherNo>();
                return list;
                //VoucherCode = Convert.ToInt32(list.FirstOrDefault().voucherNo);
                //return VoucherCode;
            }
        }
        public List<LedgerListForView> VoucherListByType(VoucherReportViewRequest request)
        {
            using (var _context = new AccountsEntities())
            {
                string dataList = "[Acc_LedgerInfoForEdit] '" + request.voucherNo + "','" + request.voucherType + "'";
                var list = _context.Database.SqlQuery<LedgerListForView>(dataList).ToList<LedgerListForView>();
                return list;

            }
        }

        #region Reports
        public List<TrialBalance_View> ReportTrailBalance(LedgerListViewRequest request)
        {
            using (var _context = new AccountsEntities())
            {
                string dataList = "[Rpt_TrialBalance] '" + request.fromDate + "','" + request.toDate + "'";
                var list = _context.Database.SqlQuery<TrialBalance_View>(dataList).ToList<TrialBalance_View>();
                return list;

            }
        }
        public List<TrialBalance_View> ReportIncomeStatement(LedgerListViewRequest request)
        {
            using (var _context = new AccountsEntities())
            {
                string dataList = "[Rpt_IncomeStatement] '" + request.fromDate + "','" + request.toDate + "'";
                var list = _context.Database.SqlQuery<TrialBalance_View>(dataList).ToList<TrialBalance_View>();
                return list;

            }
        }
        public List<TrialBalance_View> ReportBalanceSheet(LedgerListViewRequest request)
        {
            using (var _context = new AccountsEntities())
            {
                string dataList = "[Rpt_BalanceSheet] '" + request.fromDate + "','" + request.toDate + "'";
                var list = _context.Database.SqlQuery<TrialBalance_View>(dataList).ToList<TrialBalance_View>();
                return list;

            }
        }

        #endregion
    }
}
