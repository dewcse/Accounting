using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Accounts.Domain.Accounts;
using Accounts.Domain.Messaging;

namespace Accounts.Data.Accounts
{
    public class DAL_Loan
    {
        public List<DBResponse> InsertLoanBase_t(LoanBase_t loan)
        {
            using (var _context = new AccountsEntities())
            {
                string dataList = "[Loan_InsertIntoLoanBase_t] '" + loan.Id + "','" + loan.LoanInformation +
                    "','" + loan.ReferenceNo + "','" + loan.Amount + "','" + loan.Interest + "','" + loan.NetPayable + "'";
                var list = _context.Database.SqlQuery<DBResponse>(dataList).ToList<DBResponse>();
                return list;
            }
        }
        public List<DBResponse> InsertLoanPaymentHistory(LoanPayment loan)
        {
            using (var _context = new AccountsEntities())
            {
                string dataList = "[Loan_InsertLoanPayment_History] '" + loan.Id + "','" + loan.LoanBaseId + "','" + loan.CashIn +
                    "','" + loan.CashOut + "','" + loan.TransactionDate + "'";
                var list = _context.Database.SqlQuery<DBResponse>(dataList).ToList<DBResponse>();
                return list;
            }
        }

        public List<LoanInformationGet_View> LoanInformationView()
        {
            using (var _context = new AccountsEntities())
            {
                string dataList = "[Loan_GetLoanInformation]";
                var list = _context.Database.SqlQuery<LoanInformationGet_View>(dataList).ToList<LoanInformationGet_View>();
                return list;
            }
        }
    }
}
