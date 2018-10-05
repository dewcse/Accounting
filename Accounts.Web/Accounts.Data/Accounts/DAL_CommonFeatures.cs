using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Accounts.Domain.Accounts;

namespace Accounts.Data.Accounts
{
    public class DAL_CommonFeatures
    {
        public List<AccountGroup> GroupList()
        {
            using (var _context = new AccountsEntities())
            {
            string dataList = "Acc_GetGroupList";
            var list = _context.Database.SqlQuery<AccountGroup>(dataList).ToList<AccountGroup>();
            return list;

            }
        }
        public List<AccountType> TypeList()
        {
            using (var _context = new AccountsEntities())
            {
                string dataList = "Acc_GetTypeList";
                var list = _context.Database.SqlQuery<AccountType>(dataList).ToList<AccountType>();
                return list;

            }
        }
    }
}
