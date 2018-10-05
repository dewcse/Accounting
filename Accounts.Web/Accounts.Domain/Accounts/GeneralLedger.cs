using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Accounts.Domain.Accounts
{
    public class GeneralLedger
    {
        public int Id { get; set; }
        public DateTime TransactionDate { get; set; }
        public int VoucherNo { get; set; }
        public int VoucherType { get; set; }
        public string VoucherName { get; set; }
        public int AccountCode { get; set; }
        public decimal Debit { get; set; }
        public decimal Credit { get; set; }
        public string Description { get; set; }
        public string Narration { get; set; }
        public string Reference { get; set; }
        public string Creator { get; set; }
    }
}
