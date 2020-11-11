
using AuctionApplication.Controllers;
using AuctionApplication.BL;
using AuctionApplication.Models.FinalModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctionApplication.BL
{
    public class BidManager :IBidManager
    {
        private readonly IBidRepo bidRepo;
        public BidManager(IBidRepo br)
        {
            bidRepo = br;
        }
       
        public async Task<IEnumerable<FinalBid>> SelectBids(int aucID) => await bidRepo.SelectBid(aucID);

        public async Task CreateBid(FinalBid uj) => await bidRepo.CreateBid(uj);

        public async Task DeleteBid(int bidId) => await bidRepo.DeleteBid(bidId);
        
    }
}
