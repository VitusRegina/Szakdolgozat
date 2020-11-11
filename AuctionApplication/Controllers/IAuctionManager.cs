using AuctionApplication.Models.FinalModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctionApplication.Controllers
{
    public interface IAuctionManager
    {
        public Task<IEnumerable<FinalAuction>> ListAuctions(string searchString, string sortOrder, string filterMode, string category, string userId, string page);

        public Task<FinalAuction> GetAuctionOrNull(int auctionID);

        public Task<bool> TryTorolAuction(int auctionID);

        public Task<bool> TryModifyAuction(int auctionID, FinalAuction modositott);

        public Task CreateAuction(FinalAuction uj);
    }
}
