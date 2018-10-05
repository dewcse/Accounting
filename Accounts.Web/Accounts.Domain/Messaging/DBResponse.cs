using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Accounts.Domain.Messaging
{
    public class DBResponse
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string StatusCode { get; set; }
        public string StatusMessage { get; set; }
    }
}
