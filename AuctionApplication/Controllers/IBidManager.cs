using AuctionApplication.Models.FinalModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctionApplication.Controllers
{
    public interface IBidManager
    {
        public Task<IEnumerable<FinalBid>> SelectBids(int aucID);
        public Task CreateBid(FinalBid uj);

        public Task DeleteBid(int bidId); 
    }
}
