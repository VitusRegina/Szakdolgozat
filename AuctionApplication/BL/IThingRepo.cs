
using AuctionApplication.Models.Entities;
using AuctionApplication.Models.FinalModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctionApplication.BL
{
    public interface IThingRepo
    {
        public Task<IEnumerable<FinalThing>> ListThings();
        public Task<IEnumerable<FinalThing>> ListThings(int userId);
        public Task<FinalThing> GetThingOrNull(int thingID);
        public Task DeleteThing(int thingID);
        public Task ModifyThing(int thingID, FinalThing modositott);
        public Task<Thing> CreateThing(FinalThing uj);
    }
}
