using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Accounts.Domain.Messaging
{
    public class VoucherReportViewRequest
    {
        public int voucherNo { get; set; }
        public int voucherType { get; set; }
    }
}
