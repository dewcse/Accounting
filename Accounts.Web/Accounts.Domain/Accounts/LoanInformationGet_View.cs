using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Accounts.Domain.Accounts
{
    public class LoanInformationGet_View
    {
        public int LoanId { get; set; }
        public string LoanInformation { get; set; }
        public string ReferenceNo { get; set; }
        public decimal? Amount { get; set; }
        public decimal? Interest { get; set; }
        public decimal? NetPayable { get; set; }
        public decimal TotalCashIn { get; set; }
        public decimal TotalCashOut { get; set; }
        public string LastPaymentDate { get; set; }
    }
}
