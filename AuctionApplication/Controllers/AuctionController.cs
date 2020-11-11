
using AuctionApplication.BL;
using AuctionApplication.Controllers;
using AuctionApplication.BL;
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
    public class AuctionController : ControllerBase
    {
        private readonly IAuctionManager _am;


        public AuctionController(IAuctionManager am)
        {
            _am = am;
        }

        [HttpGet]
        public async Task<IEnumerable<FinalAuction>> Get(string searchString, string sortOrder, string filterMode, string category, string userId, string pageNumber)
        {
            var data = await _am.ListAuctions(searchString,sortOrder,filterMode,category,userId, pageNumber);
            return data;
        }

        [HttpGet("datalenght")]
        public async Task<ActionResult> GetPage(string searchString, string sortOrder, string filterMode, string category, string userId, string pageNumber)
        {
            var data = await _am.ListAuctions(searchString, sortOrder, filterMode, category, userId, pageNumber);
            int i = data.Count();
            return new JsonResult(i);
        }

        [HttpGet("{aucID}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<FinalAuction>> Get(int aucID)
        {
            var auc = await _am.GetAuctionOrNull(aucID);
            if (auc == null)
                return NotFound();
            else return auc;

        }

        [Authorize]
        [HttpPut("{aucID}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(204)]
        public async Task<ActionResult> Modify([FromRoute] int aucID, [FromBody] FinalAuction modositott)
        {
            if (aucID != modositott.ID)
                return BadRequest();
           
           if(await _am.TryModifyAuction(aucID, modositott))
                return NoContent();
           else return NotFound();
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] FinalAuction newThing)
        {

            await _am.CreateAuction(newThing);
            return CreatedAtAction(nameof(Get), new { }, new { });

        }

        [Authorize]
        [HttpDelete("{aucID}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(409)]
        public async Task<ActionResult> Delete(int aucID)
        {
            var thing = await _am.GetAuctionOrNull(aucID);
            if (thing == null)
                return NotFound();
            else if (await _am.TryTorolAuction(aucID))
                return Ok();
            else return Conflict();
        }
    }
}
