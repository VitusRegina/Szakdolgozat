using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AuctionApplication.Models.Entities

{
    public class Bid
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public int Sum { get; set; }
        public int AuctionID { get; set; }
        public Auction Auction { get; set; }
        public int UserID { get; set; }
        public User User { get; set; }
        public DateTime Time { get; set; }
    }
}
