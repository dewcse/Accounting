using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Accounts.Domain.Messaging
{
    public class VoucherReportViewResponse
    {
        public string Report { get; set; }
        public string StatusCode { get; set; }
        public string StatusMessage { get; set; }
    }
}
