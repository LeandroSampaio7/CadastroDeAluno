using CadastroDeAluno.Data;
using CadastroDeAluno.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CadastroDeAluno.Repositorio
{
	public class MateriaRepositorio : IMateriaRepositorio
	{
		private readonly BancoContext _bancoContext;
		public MateriaRepositorio(BancoContext bancoContext)
		{
			_bancoContext = bancoContext;
		}
		public MateriaModel AdicionarMateria(MateriaModel materia)
		{
			_bancoContext.Add(materia);
			_bancoContext.SaveChanges();
			return materia;
		}

		public List<MateriaModel> ListarTodasMaterias(string IdAluno)
		{
			return _bancoContext.MATERIAS.Where(x => x.IdAluno == IdAluno).ToList();
		}

		public MateriaModel ExcluirMateria(int Id)
		{
			MateriaModel materiaDB = BuscarMateria(Id);
			if (materiaDB == null) throw new System.Exception("Houve um erro ao atulizar as informações do Aluno");

			_bancoContext.Remove(materiaDB);
			_bancoContext.SaveChanges();
			return materiaDB;
		}

		public MateriaModel BuscarMateria(int Id)
		{
			#pragma warning disable CS8603
			return _bancoContext.MATERIAS.FirstOrDefault(x => x.Id == Id);

		}

		public List<MateriaModel> ApagarMateriasAlunos(string IdAluno)
		{
			List<MateriaModel> materias = _bancoContext.MATERIAS.Where(x => x.IdAluno == IdAluno).ToList();

			if (materias == null || materias.Count == 0)
			{
				throw new System.Exception("Nenhuma matéria encontrada para o aluno especificado.");
			}

			_bancoContext.MATERIAS.RemoveRange(materias);
			_bancoContext.SaveChanges();

			return materias;
		}

	}
}
