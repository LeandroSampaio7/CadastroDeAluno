using CadastroDeAluno.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace CadastroDeAluno.Data
{
	public class BancoContext : DbContext
	{
		public BancoContext(DbContextOptions<BancoContext> options) : base(options)
		{
		}

		public DbSet<AlunoModel> ALUNOS { get; set; }

		public DbSet<MateriaModel> MATERIAS { get; set; }

	}
}
