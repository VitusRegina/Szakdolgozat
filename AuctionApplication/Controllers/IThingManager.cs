using AuctionApplication.Models.Entities;
using AuctionApplication.Models.FinalModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctionApplication.Controllers
{
    public interface IThingManager
    { 

        public Task<IEnumerable<FinalThing>> ListThings(string searchString, string userId);

        public Task<FinalThing> GetThingOrNull(int thingID);

        public Task<bool> TryTorolThing(int thingID);

        public Task<bool> TryModifyThing(int thingID, FinalThing modositott);

        public Task<Thing> CreateThing(FinalThing uj);
    }
}
