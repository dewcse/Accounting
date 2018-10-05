using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Accounts.Domain.Messaging
{
    public class LoanViewRequest
    {
        public int loanId { get; set; }
        public int loanStatus { get; set; }
    }
}
