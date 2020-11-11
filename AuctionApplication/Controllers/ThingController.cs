
using AuctionApplication.Models.Enums;
using AuctionApplication.Models.FinalModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace AuctionApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThingController : ControllerBase
    {
        private readonly IThingManager _tm;


        public ThingController(IThingManager tm)
        {
            _tm = tm;
        }

        [Authorize]
        [HttpGet]
        public async Task<IEnumerable<FinalThing>> Get(string searchString, string userId)
        {
            var data = await _tm.ListThings(searchString, userId);
            return data;
        }

        [Authorize]
        [HttpGet("{thingID}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<FinalThing>> Get(int thingID)
        {
            var thing = await _tm.GetThingOrNull(thingID);
            if (thing == null)
                return NotFound();
            else return thing;

        }

        [Authorize]
        [HttpPut("{thingID}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(204)]
        public async Task<ActionResult> Modify([FromRoute] int thingID, [FromBody] FinalThing modositott)
        {
            if (thingID != modositott.ID)
                 return BadRequest();

            if (await _tm.TryModifyThing(thingID, modositott))
                return NoContent();
            else return NotFound();
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] FinalThing newThing)
        {

            var dbThing = await _tm.CreateThing(newThing);
            return CreatedAtAction(nameof(Get), new { id = dbThing.ID }, new FinalThing(dbThing.ID, dbThing.Name, dbThing.Desccription,(Kategoria)dbThing.Kategoria, dbThing.UserID));

        }

        [Authorize]
        [HttpDelete("{thingID}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(409)]
        public async Task<ActionResult> Delete(int thingID)
        {
            var thing = await  _tm.GetThingOrNull(thingID);
            if (thing == null)
                return NotFound();
            else 
            if (await _tm.TryTorolThing(thingID))
                return Ok();
            else return Conflict();
        }

    }
}
