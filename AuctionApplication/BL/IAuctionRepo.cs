using AuctionApplication.Models.Entities;
using AuctionApplication.Models.FinalModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctionApplication.BL
{
    public interface IAuctionRepo
    {
        public Task<IEnumerable<FinalAuction>> ListAuctions();
        public Task<IEnumerable<FinalAuction>> ListAuctionsToUsers (int userId);

        public Task<IEnumerable<FinalAuction>> ListAuctionsToThings(int thingId);
        public Task<FinalAuction> GetAuctionOrNull(int auctionID);
        public Task DeleteAuction(int auctionID);
        public Task ModifyAuction(int auctionID, FinalAuction modositott);

        public Task<Auction> CreateAuction(FinalAuction uj);
    }
}
