using System.ComponentModel.DataAnnotations;

namespace ControleGastos.Dtos
{
    public class TransacaoDTO
    {
        [Required] public string descricao { get; set; }
        [Required] public decimal valor { get; set; }
        [Required] public string tipo { get; set; }
        [Required] public int categoria_id { get; set; }
        [Required] public int pessoa_id { get; set; }
    }
}
