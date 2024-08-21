using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CadastroDeAluno.Models
{
	public class MateriaModel
	{
		public int Id { get; set; }
		public string IdAluno { get; set; }
		public string NomeMateria { get; set; }
		public string QtdSemestre { get; set; }
	}
}
