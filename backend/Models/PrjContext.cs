using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace backend.Models;

public partial class PrjContext : DbContext
{
    public PrjContext()
    {
    }

    public PrjContext(DbContextOptions<PrjContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<Credential> Credentials { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Transactionhistory> Transactionhistories { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=WINDOWS-BVQNF6J;Database=prj;Trusted_Connection=True;encrypt=False");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.AccountId).HasName("PK__ACCOUNT__349DA5A64013B5AB");

            entity.ToTable("ACCOUNT");

            entity.Property(e => e.AccountType)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Balance).HasColumnType("decimal(20, 2)");
            entity.Property(e => e.CardNo)
                .HasMaxLength(12)
                .IsUnicode(false);
            entity.Property(e => e.City)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Pin).HasColumnName("PIN");

            entity.HasOne(d => d.Customer).WithMany(p => p.Accounts)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("FK__ACCOUNT__Custome__267ABA7A");
        });

        modelBuilder.Entity<Credential>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__CREDENTI__1788CCAC4C67DCCE");

            entity.ToTable("CREDENTIALS");

            entity.Property(e => e.UserId)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("UserID");
            entity.Property(e => e.Password)
                .HasMaxLength(10)
                .IsUnicode(false);

            entity.HasOne(d => d.Customer).WithMany(p => p.Credentials)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("FK__CREDENTIA__Custo__2C3393D0");
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.CustomerId).HasName("PK__CUSTOMER__A4AE64D81F29D88A");

            entity.ToTable("CUSTOMER");

            entity.Property(e => e.Address)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.DateOfbirth)
                .HasColumnType("date")
                .HasColumnName("DateOFBirth");
            entity.Property(e => e.EmailId)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FirstName)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.LastName)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Transactionhistory>(entity =>
        {
            entity.HasKey(e => e.TransactionId).HasName("PK__TRANSACT__55433A6BC6AF4230");

            entity.ToTable("TRANSACTIONHISTORY");

            entity.Property(e => e.AmountWithdrawn).HasColumnType("decimal(20, 2)");
            entity.Property(e => e.TransactionDate).HasColumnType("datetime");

            entity.HasOne(d => d.Account).WithMany(p => p.Transactionhistories)
                .HasForeignKey(d => d.AccountId)
                .HasConstraintName("FK__TRANSACTI__Accou__29572725");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
