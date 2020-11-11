
using AuctionApplication.Models.Entities;
using AuctionApplication.Models.Enums;
using AuctionApplication.Models.FinalModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuctionApplication.BL;

namespace AuctionApplication.DAL
{
    public class AuctionRepo : IAuctionRepo
    {
        private readonly AuctionDbContext db;

        public AuctionRepo(AuctionDbContext dbcontext)
        {
            db = dbcontext;
        }

        public async Task<FinalAuction> GetAuctionOrNull(int aucID)
        {
            var auc = await db.Auctions.Include(a => a.Thing).Include(a => a.Bids).FirstOrDefaultAsync(a => a.ID == aucID);
            return auc.GetFinalAuction();
        }
      

        public async Task<IEnumerable<FinalAuction>> ListAuctions() => await db.Auctions.Include(a => a.Thing).Include(a => a.Bids).Select(a => a.GetFinalAuction()).ToListAsync();
        

        public async Task<IEnumerable<FinalAuction>> ListAuctionsToUsers(int userId) => await db.Auctions.Include(a => a.Thing).Include(a => a.Bids).Where(a => a.Thing.UserID == userId).Select(a => a.GetFinalAuction()).ToListAsync();

        public async Task<IEnumerable<FinalAuction>> ListAuctionsToThings(int thingId) => await db.Auctions.Where(a => a.Thing.ID == thingId).Select(a => a.GetFinalAuction()).ToListAsync();

        public async Task DeleteAuction(int aucID)
        {
            var auc = await db.Auctions.FindAsync(aucID);
            db.Auctions.Remove(auc);
            db.SaveChanges();
        }

        public async Task ModifyAuction(int aucID, FinalAuction modositott)
        {
            Auction auc = await db.Auctions.FindAsync(aucID);
            auc.Startprice = modositott.Startprice;
            auc.ThingID = modositott.ThingID;
            auc.StartTime = modositott.StartTime;
            auc.EndTime = modositott.EndTime;
            db.SaveChanges();
        }

        public async  Task<Auction> CreateAuction(FinalAuction uj)
        {
            Auction auc = new Auction();
            auc.Startprice = uj.Startprice;
            auc.ThingID = uj.ThingID;
            auc.StartTime = uj.StartTime;
            auc.EndTime = uj.EndTime;
            db.Auctions.Add(auc);
            db.SaveChanges();
            return auc;
        }
    }

    internal static class AuctionExtensions
    {
        public static FinalAuction GetFinalAuction(this Auction a)
        {
            FinalAuction auc;
           if (a.Bids == null || a.Bids.Count <= 0)
            {
                auc = new FinalAuction(a.ID, a.Startprice, a.ThingID, a.Thing.Name, a.Thing.Desccription, 0, a.StartTime, a.EndTime, (Kategoria)a.Thing.Kategoria);

            }
            else 
            {
                 auc = new FinalAuction(a.ID, a.Startprice, a.ThingID, a.Thing.Name, a.Thing.Desccription, a.Bids.Max(b => b.Sum), a.StartTime, a.EndTime, (Kategoria)a.Thing.Kategoria);

            }
            if (a.StartTime > DateTime.Now)
                auc.statusz = Status.Upcoming;
            else
            {
                if (a.EndTime < DateTime.Now)
                    auc.statusz = Status.Ended;
                else auc.statusz = Status.Active;
            }
           
            return auc;
        }
    }
}
