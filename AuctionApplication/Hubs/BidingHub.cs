
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;


namespace AuctionApplication.Hubs
{
    public class BidingHub : Hub
    {
        private readonly IHubContext<BidingHub> _hubContext;
        public BidingHub(IHubContext<BidingHub> hubContext)
        {
            _hubContext = hubContext;
        }
        public async Task SendSum(int aucid, int sum, string username, DateTime date)
        {
            await _hubContext.Clients.All.SendAsync("ReceiveSum", aucid, sum, username, date);
        }
    }
}
