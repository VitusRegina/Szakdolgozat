


using AuctionApplication.Models;
using AuctionApplication.Services;
using AuctionApplicaton.BL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;

namespace AuctionApplication.DAL
{
    public class UserRepo : IUserRepo
    {
        private AuctionDbContext db;
        private PasswordService PasswordService;
        private readonly IEmailSender emailSender;

        public UserRepo(AuctionDbContext context,PasswordService ps, IEmailSender es)
        {
            db = context;
            PasswordService = ps;
            emailSender = es;
        }

        public User Authenticate(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
                return null;

            var user = db.Users.SingleOrDefault(x => x.Email == email);

            if (user == null)
                return null;
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            return user;
        }

        public IEnumerable<User> GetAll()
        {
            return db.Users;
        }

        public User GetById(int id)
        {
            return db.Users.Find(id);
        }

        public User Create(User user, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new Exception("Password is required");

            if (db.Users.Any(x => x.Username == user.Username))
                throw new Exception("Username \"" + user.Username + "\" is already taken");


            if (db.Users.Any(x => x.Email == user.Email))
                throw new Exception("There is already an account registered with this email address");

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            db.Users.Add(user);
            db.SaveChanges();

            return user;
        }

        public void Update(User userParam, string password = null)
        {
            var user = db.Users.Find(userParam.Id);

            if (user == null)
                throw new Exception("User not found");

            
            if (!string.IsNullOrWhiteSpace(userParam.Username) && userParam.Username != user.Username)
            {
                
                if (db.Users.Any(x => x.Username == userParam.Username))
                    throw new Exception("Username " + userParam.Username + " is already taken");

                user.Username = userParam.Username;
            }

            
            if (!string.IsNullOrWhiteSpace(userParam.FirstName))
                user.FirstName = userParam.FirstName;

            if (!string.IsNullOrWhiteSpace(userParam.LastName))
                user.LastName = userParam.LastName;

            if (!string.IsNullOrWhiteSpace(userParam.Address))
                user.Address = userParam.Address;

            if (!string.IsNullOrWhiteSpace(userParam.PhoneNumber))
                user.PhoneNumber = userParam.PhoneNumber;

           
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }

            db.Users.Update(user);
            db.SaveChanges();
        }

        public void Delete(int id)
        {
            var user = db.Users.Find(id);
            if (user != null)
            {
                db.Users.Remove(user);
                db.SaveChanges();
            }
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }

        public string RecoverPassword(string email)
        {
            var user = db.Users.FirstOrDefault(x => x.Email == email);
            if(user == null)
                throw new Exception("There is no account registered with this email address");

            string password = PasswordService.Generate(8,0);

            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);
                
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;

                var message = new Message(new string[] { email }, "Password reset", "Your login code is:  "+password);
                emailSender.SendEmail(message);
            }

            db.Users.Update(user);
             db.SaveChanges();
            return password;

        }
    }
   
}
