
using AuctionApplication.BL;
using AuctionApplication.Models.Entities;
using AuctionApplication.Models.Enums;
using AuctionApplication.Models.FinalModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctionApplication.DAL
{
    public class ThingRepo : IThingRepo
    {
        private readonly AuctionDbContext db;

        public ThingRepo(AuctionDbContext dbcontext)
        {
            db = dbcontext;
        }

        public async Task<FinalThing> GetThingOrNull(int thingID) { 
           var thing = await db.Things.FindAsync(thingID);
            return thing?.GetFinalThing();
        }

        public async Task<IEnumerable<FinalThing>> ListThings() => await db.Things.Select(th => th.GetFinalThing()).ToListAsync();

        public async Task<IEnumerable<FinalThing>> ListThings(int userId) => await db.Things.Where(t => t.UserID==userId).Select(th => th.GetFinalThing()).ToListAsync();


        public async Task DeleteThing(int thingID)
        {
            var thing =await db.Things.FindAsync(thingID);
            db.Things.Remove(thing);
            db.SaveChanges();
        }

        public async Task ModifyThing(int thingID, FinalThing modositott)
        {
            Thing thing = await db.Things.FindAsync(thingID);
            thing.Name = modositott.Name;
            thing.Desccription = modositott.Description;
            db.SaveChanges();
        }

        public async Task<Thing> CreateThing(FinalThing uj)
        {
            Thing thing = new Thing();
            thing.Name = uj.Name;
            thing.Desccription = uj.Description;
            thing.UserID = uj.UserId;
            db.Things.Add(thing);
            db.SaveChanges();
            return thing;
        }
    }

    internal static class ThingExtensions
    {
        public static FinalThing GetFinalThing(this Thing t)
        {
            return new FinalThing(t.ID, t.Name, t.Desccription, (Kategoria)t.Kategoria, t.UserID);
        }
    }
}
