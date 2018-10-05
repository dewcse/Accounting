using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Accounts.Domain.Accounts
{
    public class LedgerListForView
    {
        public string CompanyName { get; set; }
        public string CompanyContact { get; set; }
        public string CompanyEmail { get; set; }
        public string CompanyAddress { get; set; }
        public string LogoLocation { get; set; }
        public int LedgerId { get; set; }
        public string TransactionDate { get; set; }
        public string Voucher { get; set; }
        public int VoucherNo { get; set; }
        public int VoucherType { get; set; }
        public string VoucherName { get; set; }
        public decimal? Debit { get; set; }
        public decimal? Credit { get; set; }
        public string Description { get; set; }
        public string Narration { get; set; }
        public string Reference { get; set; }
        public string ChartOfAccount { get; set; }
        public int VoucherId { get; set; }
        public int CashOfAccountType { get; set; }
        public string CashOfAccount { get; set; }
        public string Payable { get; set; }
        public string Note { get; set; }
        public decimal Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Amount { get; set; }
    }
}
