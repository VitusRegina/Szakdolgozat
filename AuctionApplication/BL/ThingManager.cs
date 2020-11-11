
using AuctionApplication.Controllers;
using AuctionApplication.BL;
using AuctionApplication.Models.Entities;
using AuctionApplication.Models.FinalModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuctionApplication.DAL;

namespace AuctionApplication.BL
{
    public class ThingManager : IThingManager
    {
        private readonly IThingRepo thingRepo;
        private readonly AuctionDbContext db;
        private readonly IImageRepo ir;
        private readonly IAuctionRepo ar;
        private readonly IAuctionManager am;
        public ThingManager(IThingRepo tr, AuctionDbContext dbcontext, IImageRepo imageRepo, IAuctionRepo aucRepo, IAuctionManager auctionManager)
        {
            thingRepo = tr;
            db = dbcontext;
            ir = imageRepo;
            ar = aucRepo;
            am = auctionManager;
        }
        public async Task<IEnumerable<FinalThing>> ListThings(string searchString, string userId) {


            var things = await thingRepo.ListThings();

            
            if (!String.IsNullOrEmpty(userId))
            {
                things = await thingRepo.ListThings(Int32.Parse(userId));
            }
            if (!String.IsNullOrEmpty(searchString))
            {
                things = things.Where(s => s.Name.ToUpper().Contains(searchString.ToUpper()));
            }

            return things;
        } 

        public async Task<FinalThing> GetThingOrNull(int thingID) => await thingRepo.GetThingOrNull(thingID);

        public async Task<bool> TryTorolThing(int thingID)
        {
            await using var transaction = await db.Database.BeginTransactionAsync();

            try
            {
                var thing = await thingRepo.GetThingOrNull(thingID);

                if (thing == null)
                {
                    transaction.Rollback();
                    return false;
                }
                else
                {
                    var auctions = ar.ListAuctionsToThings(thingID).Result;
                    foreach (var auction in auctions)
                    {
                        await am.TryTorolAuction(auction.ID);
                    }
                    var images = ir.GetImageOrNull(thingID);
                    await ir.DeleteImage(images.Result.ID);
                    await thingRepo.DeleteThing(thingID);
                    await transaction.CommitAsync();
                    return true;
                }

            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> TryModifyThing(int thingID, FinalThing modositott)
        {
            await using var transaction = await db.Database.BeginTransactionAsync();

            try
            {
                var thing = await thingRepo.GetThingOrNull(thingID);

                if (thing == null)
                {
                    transaction.Rollback();
                    return false;
                }
                else
                {
                    await thingRepo.ModifyThing(thingID, modositott);

                    await transaction.CommitAsync();
                    return true;
                }
                        
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<Thing> CreateThing(FinalThing uj) => await thingRepo.CreateThing(uj);
    }
}
