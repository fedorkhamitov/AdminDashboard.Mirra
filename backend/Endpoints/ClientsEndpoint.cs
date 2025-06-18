using AdminDashboard.Entities;
using AdminDashboard.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace AdminDashboard.Endpoints;

public static class ClientsEndpoint
{
    public static async Task<IEnumerable<Client>> GetClients(AppDbContext db)
    {
        return await db.Clients.ToListAsync();
    }
}