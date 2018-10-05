using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Accounts.Domain.Accounts
{
    public class TrialBalance_View
    {
        public string CompanyName { get; set; }
        public string CompanyContact { get; set; }
        public string CompanyEmail { get; set; }
        public string CompanyAddress { get; set; }
        public string LogoLocation { get; set; }
        public string SearchDate { get; set; }
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public string TypeName { get; set; }
        public int ChartOfAccountId { get; set; }
        public string ChartOfAccount { get; set; }
        public string TransactionDate { get; set; }
        public int VoucherType { get; set; }
        public string VoucherName { get; set; }
        public decimal Debit { get; set; }
        public decimal Credit { get; set; }
    }
}
