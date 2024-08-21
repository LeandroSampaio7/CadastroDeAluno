using CadastroDeAluno.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CadastroDeAluno.Repositorio
{
	public interface IMateriaRepositorio
	{
		MateriaModel AdicionarMateria(MateriaModel materia);
		List<MateriaModel> ListarTodasMaterias(string idAluno);
		MateriaModel ExcluirMateria(int Id);
		MateriaModel BuscarMateria(int Id);
		List<MateriaModel> ApagarMateriasAlunos(string IdAluno);
	}
}
