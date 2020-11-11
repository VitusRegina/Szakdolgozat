
using AuctionApplication.BL;
using AuctionApplication.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;

namespace AuctionApplication.Controllers
{

    [Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
    public class ImageController : ControllerBase
    {
        private readonly IImageRepo _ir;
        public static IWebHostEnvironment _environment;

        public ImageController(IImageRepo tm,IWebHostEnvironment e)
        {
            _ir = tm;
            _environment = e;
        }

        [HttpGet("{thingID}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<FileResult> Get(int thingID)
        {
            var image = await _ir.GetImageOrNull(thingID);
            if (image != null)
            {
                byte[] fileBytes = System.IO.File.ReadAllBytes(image.filePath);
                string fileName = "myfile.ext";
                return File(fileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, fileName);
            }
            return null;
        }

        [Authorize]
        [HttpDelete("{imageID}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(409)]
        public async Task<ActionResult> Delete(int imageID)
        {
            var thing = await _ir.GetImageOrNull(imageID);
            if (thing == null)
                return NotFound();
            await _ir.DeleteImage(imageID);
            return Ok();
        }

        public class FileUploadApi
        {
            public Microsoft.AspNetCore.Http.IFormFile files { get; set; }
        }

       // [Authorize]
        [HttpPost]
        public async Task<string> FileUpload([FromForm(Name = "file")]IFormFile file, [FromForm]int thingID)
        {
            
            try
            {
                if (file.Length > 0)
                {
                    if (!Directory.Exists(_environment.WebRootPath + "\\Upload\\"))
                    {
                        Directory.CreateDirectory(_environment.WebRootPath + "\\Upload\\");
                    }
                    using (FileStream fileStream = System.IO.File.Create(_environment.WebRootPath + "\\Upload\\" + file.FileName))
                    {
                        file.CopyTo(fileStream);
                        fileStream.Flush();
                    }
                    Image img = new Image();
                    img.filePath= _environment.WebRootPath+"\\Upload\\" + file.FileName;
                    img.ThingID = thingID;
                    await _ir.CreateImage(img);
                    return "\\Upload\\" + file.FileName;
                }
                else return "Failed!";
                
                }
            catch (Exception ex)
            {
                return ex.Message.ToString();
            }
        
        }
    }
    

}
