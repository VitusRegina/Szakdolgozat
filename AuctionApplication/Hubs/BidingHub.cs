using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace AuctionApplication.Hubs
{
    public class BidingHub : Hub
    {
        public async Task SendMessage(int id, string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage",id, user, message);
        }

        public async Task SendSum(int id, int sum)
        {
            await Clients.All.SendAsync("ReceiveSum", id, sum);
        }
    }
}
