using System.ComponentModel.DataAnnotations;

namespace ControleGastos.Dtos
{
    public class PessoaDTO
    {
        [Required] public string nome { get; set; }
        [Required] public int idade { get; set; }
    }
}
