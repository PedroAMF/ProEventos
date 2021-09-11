using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Contrato
{
	public interface IPaletrantePersist
	{

        //PALESTRANTES

        Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string nome, bool includeEventos);
		Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos);
		Task<Palestrante> GetPalestrantesyIdAsync(int palestranteId, bool includeEventos);


	}
}