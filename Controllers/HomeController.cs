using CadastroDeAluno.Models;
using CadastroDeAluno.Repositorio;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace CadastroDeAluno.Controllers
{
    public class HomeController : Controller
    {
        private readonly IAlunoRepositorio _alunoRepositorio;
        public HomeController(IAlunoRepositorio alunoRepositorio)
        {
            _alunoRepositorio = alunoRepositorio;

		}

		public IActionResult Index()
        {
            return View();
        }

        public IActionResult Incluir()
        {
            return View();
        }

		public IActionResult Listar()
		{
            List<AlunoModel> aluno = _alunoRepositorio.ListarTodosAlunos();
			return new JsonResult(aluno);
		}

		public IActionResult BuscarEditar(int id)
		{
			AlunoModel aluno = _alunoRepositorio.BuscarEditar(id);
			return new JsonResult(aluno);
		}



		[HttpPost]
        public IActionResult Incluir(AlunoModel aluno)
        {
			_alunoRepositorio.Adicionar(aluno);
            return RedirectToAction("Index");
		}

		[HttpPost]
		public IActionResult Alterar(AlunoModel aluno)
		{
			_alunoRepositorio.Alterar(aluno);
			return RedirectToAction("Index");
		}

		[HttpPost]
		public IActionResult Excluir(int id)
		{
			_alunoRepositorio.Excluir(id);
			return RedirectToAction("Index");
		}


		[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

	}
}