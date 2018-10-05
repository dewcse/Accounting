using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Accounts.Domain.Accounts;
using Accounts.Domain.Messaging;

namespace Accounts.Data.Accounts
{
    public class DAL_ChartOfAccount
    {
        public List<DBResponse> InsertChartOfAccount(ChartOfAccount chart)
        {
            using (var _context = new AccountsEntities())
            {
                string dataList = "[Acc_InsertChartOfAccount]'" + chart.Id + "','" + chart.GroupId + 
                    "','" + chart.TypeId + "','" + chart.Name + "'";
                var list = _context.Database.SqlQuery<DBResponse>(dataList).ToList<DBResponse>();
                return list;

            }
        }

        public List<ChartOfAccount> ChartOfAccountList()
        {
            using (var _context = new AccountsEntities())
            {
                string dataList = "[Acc_GetChartOfAccountList]";
                var list = _context.Database.SqlQuery<ChartOfAccount>(dataList).ToList<ChartOfAccount>();
                return list;

            }
        }
    }
}
