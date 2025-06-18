using AdminDashboard.Entities;
using AdminDashboard.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace AdminDashboard.Endpoints;

public static class PaymentsEndpoint
{
    public static async Task<IEnumerable<Payment>> GetPayments(AppDbContext db, int take = 5)
    {
        return await db.Payments
            .OrderByDescending(p => p.Date)
            .Take(take)
            .ToListAsync();
    }
}