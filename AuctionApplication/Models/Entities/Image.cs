using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AuctionApplication.Models.Entities

{
    public class Image
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public String filePath { get; set; }
        public int ThingID { get; set; }
        public Thing Thing { get; set; }
    }
}
