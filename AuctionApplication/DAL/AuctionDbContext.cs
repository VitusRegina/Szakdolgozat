
using AuctionApplication.Models;
using AuctionApplication.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace AuctionApplication.DAL
{
    public class AuctionDbContext : DbContext
    {
        public AuctionDbContext(DbContextOptions<AuctionDbContext> options)
            : base(options)
        { }
       
        public DbSet<Thing> Things { get; set; }
        public DbSet<Bid> Bids { get; set; }
        public DbSet<Auction> Auctions { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Image> Images { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Thing>().ToTable("Objects");
            modelBuilder.Entity<Bid>().ToTable("Bids");
            modelBuilder.Entity<Auction>().ToTable("Auctions");
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<Image>().ToTable("Images");

            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }
        }
    }
}
