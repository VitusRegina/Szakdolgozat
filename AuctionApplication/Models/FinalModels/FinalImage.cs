


using AuctionApplication.Models.Entities;

namespace AuctionApplication.Models.FinalModels
{
   
    public class FinalImage
    {
        public FinalImage(int id, Image i, int ti)
        {
            ID = id;
            Image =i;
            ThingID = ti;
        }
        public int ID { get; set; }

        public Image Image { get; set; }
        public int ThingID { get; set; }
    }
}
