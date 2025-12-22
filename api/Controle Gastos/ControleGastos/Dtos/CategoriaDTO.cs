using System.ComponentModel.DataAnnotations;

namespace ControleGastos.Dtos
{
    public class CategoriaDTO
    {
        [Required] public string descricao { get; set; }
        [Required] public string finalidade { get; set; }
    }
}
