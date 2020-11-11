using AuctionApplication.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AuctionApplication.Models.Entities

{
    public class Thing
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public string Name { get; set; }
        public string Desccription { get; set; }
        public int UserID { get; set; }

        public User User { get; set; }

        public int Kategoria { get; set; }

        public List<Auction> Auctions { get; set; }

        public List<Image> Images { get; set; }

    }
}
