using CadastroDeAluno.Data;
using CadastroDeAluno.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CadastroDeAluno.Repositorio
{
	public class AlunoRepositorio : IAlunoRepositorio
	{
		private readonly BancoContext _bancoContext;
		public AlunoRepositorio(BancoContext bancoContext)
		{
			_bancoContext = bancoContext;
		}
		public AlunoModel Adicionar(AlunoModel aluno)
		{
			_bancoContext.Add(aluno);
			_bancoContext.SaveChanges();
			return aluno;
		}

		public List<AlunoModel> ListarTodosAlunos()
		{
			return _bancoContext.ALUNOS.ToList();
		}

		public AlunoModel BuscarEditar(int id)
		{
			#pragma warning disable CS8603 
			return _bancoContext.ALUNOS.FirstOrDefault(x => x.Id == id);

		}

		public AlunoModel Alterar(AlunoModel aluno)
		{
			AlunoModel alunoDB = BuscarEditar(aluno.Id);
			if (alunoDB == null) throw new System.Exception("Houve um erro ao atulizar as informações do Aluno");

			alunoDB.Nome = aluno.Nome;
			alunoDB.Cpf = aluno.Cpf;
			alunoDB.Matricula = aluno.Matricula;
			alunoDB.Nacionalidade = aluno.Nacionalidade;
			alunoDB.Cep = aluno.Cep;
			alunoDB.Estado = aluno.Estado;
			alunoDB.Cidade = aluno.Cidade;
			alunoDB.Endereco = aluno.Endereco;
			alunoDB.Email = aluno.Email;
			alunoDB.Telefone = aluno.Telefone;

			_bancoContext.Update(alunoDB);
			_bancoContext.SaveChanges();
			return alunoDB;
		}

		public AlunoModel Excluir(int id)
		{
			AlunoModel alunoDB = BuscarEditar(id);
			if (alunoDB == null) throw new System.Exception("Houve um erro ao atulizar as informações do Aluno");

			_bancoContext.Remove(alunoDB);
			_bancoContext.SaveChanges();
			return alunoDB;
		}

	}
}
