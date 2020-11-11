using AuctionApplication.Models.Enums;
using System;


namespace AuctionApplication.Models.FinalModels
{
    public class FinalAuction
    {
        public FinalAuction() { }

        public FinalAuction(int id, int n, int d)
        {
            ID = id;
            Startprice = n;
            ThingID = d;
            ActualPrice = n;
        }
        public FinalAuction(int id, int n, int d, string na, string de, int ap, DateTime? t1, DateTime? t2,Kategoria? kat)
        {
            ID = id;
            Startprice = n;
            ThingID = d;
            ActualPrice = ap;
            ThingName = na;
            ThingDescription = de;
            StartTime = t1;
            EndTime = t2;
            Sikeres = false;
            ThingKategoria = kat;
    }
        public int ID { get; set; }
        public int Startprice { get; set; }
        public int ThingID { get; set; }
        public string ThingName { get; set; }
        public string ThingDescription { get; set; }
        public Kategoria? ThingKategoria { get; set; }
        public int ActualPrice { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public Boolean Sikeres { get; set; }
        public Status? statusz { get; set; }
    }
}
