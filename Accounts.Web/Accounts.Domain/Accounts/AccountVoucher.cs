using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Accounts.Domain.Accounts
{
    public class AccountVoucher
    {
        public int VoucherNo { get; set; }
        public int VoucherType { get; set; }
        public string VoucherName { get; set; }
    }
}
