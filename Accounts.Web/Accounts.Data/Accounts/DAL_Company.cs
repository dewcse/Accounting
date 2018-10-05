using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Accounts.Domain.Accounts;
using Accounts.Domain.Messaging;

namespace Accounts.Data.Accounts
{
    public class DAL_Company
    {
        AccountsEntities _context = new AccountsEntities();

        public List<CompanyInfo> CompanyList()
        {
            using (var _context = new AccountsEntities())
            {
                string dataList = "Acc_GetCompanyList";
                var list = _context.Database.SqlQuery<CompanyInfo>(dataList).ToList<CompanyInfo>();
                return list;

            }
        }
        //GET: Company by Id
        public Company GetCompanyById(string id)
        {
            using (AccountsEntities contextObj = new AccountsEntities())
            {
                var Id = Convert.ToInt32(id);
                var getCompanyById = contextObj.Companies.Find(Id);
                return getCompanyById;
            }
        }
        // Add Company

        public List<DBResponse> InsertCompany(CompanyInfo company)
        {
            string dataList = "[InsertCompany] '" + company.Id + "', '" + company.Name + "', '" + company.Contact + "', '"
                                                  + company.Email + "', '" + company.Address + "', '" + company.LogoLocation + "'";

            return _context.Database.SqlQuery<DBResponse>(dataList).ToList<DBResponse>();
        }
        public string DeleteCompany(string companyId)
        {

            if (!String.IsNullOrEmpty(companyId))
            {
                try
                {
                    int _companyId = Int32.Parse(companyId);
                    using (AccountsEntities contextObj = new AccountsEntities())
                    {
                        var _company = contextObj.Companies.Find(_companyId);
                        contextObj.Companies.Remove(_company);
                        contextObj.SaveChanges();
                        return "Selected companies record deleted sucessfully";
                    }
                }
                catch (Exception)
                {
                    return "Company details not found";
                }
            }
            else
            {
                return "Invalid operation";
            }
        }
    }
}
