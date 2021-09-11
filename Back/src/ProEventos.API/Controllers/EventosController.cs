using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProEventos.Application.Contrato;
using ProEventos.Domain;

namespace ProEventos.API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class EventosController : ControllerBase
	{
		private readonly IEventosService _eventosService;
		public EventosController(IEventosService eventosService)
		{
			_eventosService = eventosService;
		}

		[HttpGet]
		public async Task<IActionResult> Get()
		{
			try
			{
				var eventos = await _eventosService.GetAllEventosAsync(true);
				if (eventos == null) return NotFound("Nenhum evento encontrado.");

				return Ok(eventos);
			}
			catch (Exception error)
			{
				return this.StatusCode(StatusCodes.Status500InternalServerError,
				$"Error ao tentar recuperar Eventos. Error: {error.Message}");
			}
		}
		[HttpGet("{id}")]
		public async Task<IActionResult> GetById(int id)
		{
			try
			{
				var evento = await _eventosService.GetEventoByIdAsync(id, true);
				if (evento == null) return NotFound("Evento por Id não encontrado");

				return Ok(evento);
			}
			catch (Exception error)
			{
				return this.StatusCode(StatusCodes.Status500InternalServerError,
				$"Error ao tentar RECUPERAR Eventos. Error: {error.Message}");
			}
		}
		[HttpGet("{tema}/tema")]
		public async Task<IActionResult> GetByTema(string tema)
		{
			try
			{
				var evento = await _eventosService.GetAllEventosByTemaAsync(tema, true);
				if (evento == null) return NotFound("Eventos por tema não encontrados.");

				return Ok(evento);
			}
			catch (Exception error)
			{
				return this.StatusCode(StatusCodes.Status500InternalServerError,
				$"Error ao tentar RECUPERAR Eventos. Error: {error.Message}");
			}
		}

		[HttpPost]
		public async Task<IActionResult> Post(Evento model)
		{
			try
			{
				var evento = await _eventosService.AddEvento(model);
				if (evento == null) return BadRequest("Erro ao tentar adicionar evento.");

				return Ok(evento);
			}
			catch (Exception error)
			{
				return this.StatusCode(StatusCodes.Status500InternalServerError,
				$"Error ao tentar ADICIONAR Eventos. Error: {error.Message}");
			}
		}
		[HttpPut("{id}")]
		public async Task<IActionResult> Put(int id, Evento model)
		{
			try
			{
				var evento = await _eventosService.UpdateEvento(id, model);
				if (evento == null) return BadRequest("Erro ao tentar adicionar evento.");

				return Ok(evento);
			}
			catch (Exception error)
			{
				return this.StatusCode(StatusCodes.Status500InternalServerError,
				$"Error ao tentar ATUALIZAR Eventos. Error: {error.Message}");
			}
		}
		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(int id)
		{
			try
			{
				return await _eventosService.DeleteEvento(id) ?
											Ok("Deletado") :
											BadRequest("Evento não DELETADO");
			}
			catch (Exception error)
			{
				return this.StatusCode(StatusCodes.Status500InternalServerError,
				$"Error ao tentar DELETAR Eventos. Error: {error.Message}");
			}
		}
	}
}
