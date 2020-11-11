
using AuctionApplication.BL;
using AuctionApplication.Models;
using AuctionApplication.Models.Entities;
using AuctionApplication.Models.FinalModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctionApplication.DAL
{
    public class BidRepo : IBidRepo
    {
        private readonly AuctionDbContext db;

        public BidRepo(AuctionDbContext dbcontext)
        {
            db = dbcontext;
        }
   
        public async Task<IEnumerable<FinalBid>> SelectBid(int aucID) => await db.Bids.Where(b => b.AuctionID == aucID).OrderBy(b => b.Sum).Select(t => t.GetFinalBid()).ToListAsync();
       
        public async Task DeleteBid(int bidID)
        {
            var bid = await db.Bids.FindAsync(bidID);
            db.Bids.Remove(bid);
            db.SaveChanges();
        }

        public async Task CreateBid(FinalBid uj)
        {
            Bid bid = new Bid();
            bid.Sum = uj.Sum;
            bid.AuctionID = uj.AuctionID;
            bid.UserID = uj.PersonID;
            bid.Time = uj.Time;
            db.Bids.Add(bid);
            db.SaveChanges();
        }
    }

    internal static class BidExtensions
    {
        public static FinalBid GetFinalBid(this Bid b)
        {
            return new FinalBid(b.ID, b.Sum,b.AuctionID, b.UserID, b.User.Username, b.Time );
        }
    }
}
