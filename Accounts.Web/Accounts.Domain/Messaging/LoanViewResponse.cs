using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Accounts.Domain.Accounts;

namespace Accounts.Domain.Messaging
{
    public class LoanViewResponse
    {
        public List<LoanInformationGet_View> LoanList { get; set; }
        public string StatusCode { get; set; }
        public string StatusMessage { get; set; }
    }
}
