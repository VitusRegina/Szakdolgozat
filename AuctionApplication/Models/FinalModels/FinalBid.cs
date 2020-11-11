using System;

namespace AuctionApplication.Models.FinalModels

{
    public class FinalBid
    {
        public FinalBid() { }

        public FinalBid(int id, int s, int a, int pid, string p, DateTime t)
        {
            ID = id;
            Sum = s;
            AuctionID = a;
            PersonID = pid;
            PersonName = p;
            Time = t;
        }

        public int ID { get; set; }
        public int Sum { get; set; }

        public int AuctionID { get; set; }

        public int PersonID {get; set;}

        public string PersonName { get; set; }

        public DateTime Time { get; set; }

    }
}
