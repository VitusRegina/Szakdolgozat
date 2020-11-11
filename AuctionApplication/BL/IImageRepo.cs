
using AuctionApplication.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctionApplication.BL
{
    public interface IImageRepo
    {
       
        public Task<Image> GetImageOrNull(int thingID);
        public Task DeleteImage(int imageID);

        public Task CreateImage(Image uj);
    }
}
