using Accounts.Domain.Accounts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Accounts.Domain.Messaging
{
    public class LedgerListViewResponse
    {
        public string StatusCode { get; set; }
        public string StatusMessage { get; set; }
        public List<LedgerListForView> LedgerListForView { get; set; }
    }
}
