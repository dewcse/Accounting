using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Accounts.Domain.Accounts;

namespace Accounts.Domain.Messaging
{
    public class VoucherInsertRequest
    {
        public string ledgerXML { get; set; }
        public List<GeneralLedger> ledgerList { get; set; } 
        public string voucherXml { get; set; }
        public List<VoucherList> voucherList { get; set; } 
    }
}
