using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CadastroDeAluno.Models
{
	public class AlunoModel
	{
		public int Id { get; set; }

		#pragma warning disable CS8618 
		public string Nome { get; set; }

		#pragma warning disable CS8618 
		public string Cpf { get; set; }

		#pragma warning disable CS8618
		public string Matricula { get; set; }

		#pragma warning disable CS8618
		public string Nacionalidade { get; set; }

		#pragma warning disable CS8618
		public string Cep { get; set; }

		#pragma warning disable CS8618
		public string Estado { get; set; }

		#pragma warning disable CS8618
		public string Cidade { get; set; }

		#pragma warning disable CS8618
		public string Endereco { get; set; }

		#pragma warning disable CS8618
		public string Email { get; set; }

		#pragma warning disable CS8618
		public string Telefone { get; set; }



	}
}
