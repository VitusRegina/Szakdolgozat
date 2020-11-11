
using AuctionApplication.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctionApplication.Models.FinalModels
{
    public class FinalThing
    {
        public FinalThing() {}
        
        public FinalThing(int id,string n,string d,Kategoria k, int i)
        {
            ID = id;
            Name = n;
            Description = d;
            /* switch(k)
             {
                 case "otthon":
                     Kategoria = Kategoria.Otthon;
                     break;
                 case "auto":
                     Kategoria = Kategoria.Auto;
                     break;
                 case "muveszet":
                     Kategoria = Kategoria.Muveszet;
                     break;
                 case "sport":
                     Kategoria = Kategoria.Sport;
                     break;
                 case "muszaki":
                     Kategoria = Kategoria.Muszaki;
                     break;
                 case "regiseg":
                     Kategoria = Kategoria.Regiseg;
                     break;
                 default:
                     break;
             }*/
            Kategoria = k;

            UserId = i;
        }

        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public int UserId { get; set; }

        public Kategoria Kategoria { get; set; }
    }
}
