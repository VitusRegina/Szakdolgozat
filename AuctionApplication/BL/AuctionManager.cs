
using AuctionApplication.Controllers;
using AuctionApplication.DAL;
using AuctionApplication.Models.FinalModels;
using PagedList;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



namespace AuctionApplication.BL
{
    public class AuctionManager : IAuctionManager
    {
        private readonly IAuctionRepo aucRepo;
        private readonly AuctionDbContext db;
        private readonly IBidManager bm;
        public AuctionManager(IAuctionRepo ar, AuctionDbContext dbcontext, IBidManager bigmanager)
        {
            aucRepo = ar;
            db = dbcontext;
            bm = bigmanager;
        }
        public async Task<IEnumerable<FinalAuction>> ListAuctions(string searchString, string sortOrder, string filterMode, string category, string userId, string page) {

            IEnumerable<FinalAuction> auctions;
            if (!String.IsNullOrEmpty(userId))
            {
                auctions = await aucRepo.ListAuctionsToUsers(Int32.Parse(userId));
            }
            else auctions = await aucRepo.ListAuctions();

            if (!String.IsNullOrEmpty(searchString))
            {
                auctions = auctions.Where(s => s.ThingName.ToUpper().Contains(searchString.ToUpper()));
            }


            if (!String.IsNullOrEmpty(category))
            {
                auctions = auctions.Where(s => (int)s.ThingKategoria == Int32.Parse(category));
            }

            switch (sortOrder)
            {
                case "start_desc":
                    auctions = auctions.OrderByDescending(s => s.StartTime);
                    break;
                case "start_asc":
                    auctions = auctions.OrderBy(s => s.StartTime);
                    break;
                case "price_desc":
                    auctions = auctions.OrderByDescending(s => s.ActualPrice);
                    break;
                case "price_asc":
                    auctions = auctions.OrderBy(s => s.ActualPrice);
                    break;
                default:
                    break;
            }
            switch (filterMode)
            {
                case "active":
                    auctions = auctions.Where(s => s.statusz==Models.Enums.Status.Active);
                    break;
                case "next_week":
                    auctions = auctions.Where(s => (s.StartTime > DateTime.Now && s.StartTime < DateTime.Now + new TimeSpan(7, 0, 0, 0)));
                    break;
                case "next_month":
                    auctions = auctions.Where(s => (s.StartTime > DateTime.Now && s.StartTime < DateTime.Now + new TimeSpan(30, 0, 0, 0)));
                    break;
                default:
                    break;
            }

            if (!String.IsNullOrEmpty(page))
            {
                int pageSize = 4;
                int pageNumber = Int32.Parse(page);
                return auctions.ToPagedList(pageNumber, pageSize);
            }

            return auctions;
        }

        public async Task<FinalAuction> GetAuctionOrNull(int auctionID) => await aucRepo.GetAuctionOrNull(auctionID);

        public async Task<bool> TryTorolAuction(int auctionID)
        {
            await using var transaction = await db.Database.BeginTransactionAsync();

            try
            {
                var auc = await aucRepo.GetAuctionOrNull(auctionID);

                if (auc == null)
                {
                    transaction.Rollback();
                    return false;
                }
                else
                {
                    var bids = bm.SelectBids(auc.ID).Result;
                    foreach(var bid in bids)
                    {
                        await bm.DeleteBid(bid.ID);
                    }
                    await aucRepo.DeleteAuction(auctionID);
                    await transaction.CommitAsync();
                    return true;
                }

            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> TryModifyAuction(int auctionID, FinalAuction modositott)
        {
            await using var transaction = await db.Database.BeginTransactionAsync();

            try
            {
                var auc = await aucRepo.GetAuctionOrNull(auctionID);

                if (auc == null)
                {
                    transaction.Rollback();
                    return false;
                }
                else
                {
                    await aucRepo.ModifyAuction(auctionID, modositott);

                    await transaction.CommitAsync();
                    return true;
                }

            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task CreateAuction(FinalAuction uj) {
            var auc = aucRepo.CreateAuction(uj).Result;
            bm.CreateBid(new FinalBid(0, 0, auc.ID, 1, "", new DateTime()));
            }
    }
}
