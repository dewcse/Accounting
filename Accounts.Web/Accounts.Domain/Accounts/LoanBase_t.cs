using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Accounts.Domain.Accounts
{
    public class LoanBase_t
    {
        public int Id { get; set; }
        public string LoanInformation { get; set; }
        public string ReferenceNo { get; set; }
        public decimal? Amount { get; set; }
        public decimal? Interest { get; set; }
        public decimal? NetPayable { get; set; }
    }
}
