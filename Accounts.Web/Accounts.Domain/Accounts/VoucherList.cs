using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Accounts.Domain.Accounts
{
    public class VoucherList
    {
        public int Id { get; set; }
        public int VoucherNo { get; set; }
        public int VoucherType { get; set; }
        public string VoucherName { get; set; }
        public int CashOfAccountType { get; set; }
        public string Payable { get; set; }
        public string Note { get; set; }
        public int AccountCode { get; set; }
        public string Description { get; set; }
        public decimal Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Amount { get; set; }
    }
}
