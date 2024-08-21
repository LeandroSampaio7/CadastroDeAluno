using CadastroDeAluno.Models;
using CadastroDeAluno.Repositorio;
using Microsoft.AspNetCore.Mvc;

namespace CadastroDeAluno.Controllers
{
	public class MateriaController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}

		private readonly IMateriaRepositorio _materiaRepositorio;
		public MateriaController(IMateriaRepositorio materiaRepositorio)
		{
			_materiaRepositorio = materiaRepositorio;

		}

		[HttpPost]
		public IActionResult IncluirMateria(MateriaModel materia)
		{
			_materiaRepositorio.AdicionarMateria(materia);
			return new JsonResult(materia);
		}

		[HttpPost]
		public IActionResult ExcluirMateria(int Id)
		{
			_materiaRepositorio.ExcluirMateria(Id);
			return new JsonResult(Id);
		}

		public IActionResult BuscarMateria(int id)
		{
			MateriaModel materia = _materiaRepositorio.BuscarMateria(id);
			return new JsonResult(materia);
		}

		public IActionResult ListarMaterias(string IdAluno)
		{
			List<MateriaModel> materia = _materiaRepositorio.ListarTodasMaterias(IdAluno);
			return new JsonResult(materia);
		}

		[HttpPost]
		public IActionResult ApagarMateriasAlunos(string IdAluno)
		{
			_materiaRepositorio.ApagarMateriasAlunos(IdAluno);
			return new JsonResult(IdAluno);
		}


	}
}
