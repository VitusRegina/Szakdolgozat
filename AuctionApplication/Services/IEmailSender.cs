﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctionApplication.Services
{
    public interface IEmailSender
    {
        void SendEmail(Message message);
    }
}
