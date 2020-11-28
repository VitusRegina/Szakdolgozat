using AuctionApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctionApplicaton.BL
{
    public interface IUserRepo
    {
       public User Authenticate(string username, string password);
       public  IEnumerable<User> GetAll();
        public User GetById(int id);
        public User Create(User user, string password);
        public void Update(User user, string password = null);
        public void Delete(int id);

        public string RecoverPassword(string email);
    }
}
