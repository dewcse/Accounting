using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Accounts.Domain.Accounts
{
    public class LoanPayment
    {
        public int Id { get; set; }
        public string LoanBaseId { get; set; }
        public decimal CashIn { get; set; }
        public decimal CashOut { get; set; }
        public DateTime TransactionDate  { get; set; }
    }
}
