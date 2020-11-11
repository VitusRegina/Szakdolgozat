using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AuctionApplication.Controllers;
using AuctionApplication.BL;
using AuctionApplication.DAL;
using AuctionApplication.Hubs;
using AuctionApplication.Services;
using AuctionApplicaton.Controller;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using AuctionApplication.BL;

namespace AuctionApplication
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddDbContext<AuctionDbContext>(options =>
                  options.UseSqlServer(Configuration.GetConnectionString("AuctionDatabase")));

            services.AddSignalR();
            services.AddMvc();

            services.AddScoped<IThingRepo, ThingRepo>();
            services.AddScoped<IThingManager, ThingManager>();
            services.AddScoped<IAuctionRepo, AuctionRepo>();
            services.AddScoped<IAuctionManager, AuctionManager>();
            services.AddScoped<IBidRepo, BidRepo>();
            services.AddScoped<IBidManager, BidManager>();
            services.AddScoped<IImageRepo, ImageRepo>();
            services.AddScoped<IUser, UserRepo>();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            var appSettingsSection = Configuration.GetSection("MySettings");
            services.Configure<MySettings>(appSettingsSection);


            var mySettings = appSettingsSection.Get<MySettings>();
            var key = Encoding.ASCII.GetBytes(mySettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.Events = new JwtBearerEvents
                {
                    OnTokenValidated = context =>
                    {
                        var userService = context.HttpContext.RequestServices.GetRequiredService<IUser>();
                        var userId = int.Parse(context.Principal.Identity.Name);
                        var user = userService.GetById(userId);
                        if (user == null)
                        {
                            context.Fail("User no longer exists");
                        }
                        return Task.CompletedTask;
                    }
                };
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
        }

       
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(builder =>
            {
                builder.WithOrigins("http://localhost:3000")
                .AllowAnyHeader().AllowAnyMethod().AllowCredentials();
            });

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<BidingHub>("/biding");
                endpoints.MapControllers();
            });
        }
    }
}
