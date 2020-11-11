
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

        public BidController(IBidManager bm)
        {
            _bm = bm;
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
            await _bm.CreateBid(newBid);
            return CreatedAtAction(nameof(Get), new { }, new { });
        }

        
    }
}
