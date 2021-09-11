using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contrato;
using ProEventos.Persistence.Context;


namespace ProEventos.Persistence.ContratoBuild
{
	public class PalestrantePersist : IPaletrantePersist
	{
		private readonly ProEventosContext _context;
		public PalestrantePersist(ProEventosContext context)
		{
			_context = context;
			_context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
		}
		public async Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos = false)
		{
			IQueryable<Palestrante> query = _context.Palestrantes
			.Include(p => p.RedesSociais);

			if (includeEventos)
			{
				query = query
				.Include(p => p.PalestrantesEventos)
				.ThenInclude(pe => pe.Evento);
			}

			query = query
						.OrderBy(p => p.Id);


			return await query.ToArrayAsync();
		}

		public async Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string nome, bool includeEventos)
		{
			IQueryable<Palestrante> query = _context.Palestrantes
			.Include(p => p.RedesSociais);

			if (includeEventos)
			{
				query = query
				.Include(p => p.PalestrantesEventos)
				.ThenInclude(pe => pe.Evento);
			}

			query = query
						.OrderBy(p => p.Id)
						.Where(p => p.Nome.ToLower().Contains(nome.ToLower()));


			return await query.ToArrayAsync();
		}

		public async Task<Palestrante> GetPalestrantesyIdAsync(int palestranteId, bool includeEventos)
		{
			IQueryable<Palestrante> query = _context.Palestrantes
			.Include(p => p.RedesSociais);

			if (includeEventos)
			{
				query = query
				.Include(p => p.PalestrantesEventos)
				.ThenInclude(pe => pe.Evento);
			}

			query = query
						.OrderBy(p => p.Id)
						.Where(p => p.Id == palestranteId);
			return await query.FirstOrDefaultAsync();
		}

	}
}