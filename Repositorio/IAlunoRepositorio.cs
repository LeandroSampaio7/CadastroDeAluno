using CadastroDeAluno.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CadastroDeAluno.Repositorio
{
	public interface IAlunoRepositorio
	{
		AlunoModel BuscarEditar(int id);
		List<AlunoModel> ListarTodosAlunos();
		AlunoModel Adicionar(AlunoModel aluno);
		AlunoModel Alterar(AlunoModel aluno);
		AlunoModel Excluir(int id);

	}
}
