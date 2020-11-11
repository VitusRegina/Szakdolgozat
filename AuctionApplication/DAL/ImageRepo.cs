
using AuctionApplication.BL;
using AuctionApplication.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctionApplication.DAL
{
    public class ImageRepo : IImageRepo
    {
        private readonly AuctionDbContext db;

        public ImageRepo(AuctionDbContext dbcontext)
        {
            db = dbcontext;
        }
        public async Task CreateImage(Image uj)
        {
            db.Images.Add(uj);
            db.SaveChanges();
        }

        public async Task DeleteImage(int imageID)
        {
            var im = await db.Images.FindAsync(imageID);
            db.Images.Remove(im);
            db.SaveChanges();
        }

        public async Task<Image> GetImageOrNull(int thingID)
        {
            var im = db.Images.Where(i => i.ThingID == thingID).FirstOrDefault();
            return im;
        }
    }
}
