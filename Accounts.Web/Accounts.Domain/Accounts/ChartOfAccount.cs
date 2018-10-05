using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Accounts.Domain.Accounts
{
    public class ChartOfAccount
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public int TypeId { get; set; }
        public string Name { get; set; }
        public string GroupName { get; set; }
        public string TypeName { get; set; }
    }
}
