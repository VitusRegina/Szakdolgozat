
using AuctionApplication.Hubs;
using AuctionApplication.Models.FinalModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctionApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BidController : ControllerBase
    {
        private readonly IBidManager _bm;
        private readonly BidingHub hub;

        public BidController(IBidManager bm, BidingHub h)
        {
            _bm = bm;
            hub = h;
        }

        [HttpGet("{aucID}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IEnumerable<FinalBid>> Get(int aucID)
        {
              
            var data = await _bm.SelectBids(aucID);
            return data;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] FinalBid newBid)
        {
            var data = await _bm.SelectBids(newBid.AuctionID);
            int max=0;
            if(data != null)
                max = data.Max(b => b.Sum);
            if(max >= newBid.Sum)
            {
                return BadRequest(new { message = "Sum must be higher than actual price!" });
            }
            await _bm.CreateBid(newBid);
            await hub.SendSum(newBid.AuctionID, newBid.Sum, newBid.PersonName, newBid.Time);
            return Ok();
        }

        
    }
}
