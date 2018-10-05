using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Accounts.Domain.Messaging
{
    public class LedgerListViewRequest
    {
        public string fromDate { get; set; }
        public string toDate { get; set; }
        public int voucherType { get; set; }
    }
}
