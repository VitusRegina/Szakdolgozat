using AuctionApplication.Models.FinalModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctionApplication.BL
{
    public interface IBidRepo
    {
        public Task<IEnumerable<FinalBid>> SelectBid(int aucID);
        public Task DeleteBid(int bidID);
        public Task CreateBid(FinalBid uj);
    }
}
