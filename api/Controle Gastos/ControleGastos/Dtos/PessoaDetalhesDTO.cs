using System.Text.RegularExpressions;

namespace ControleGastos.Dtos
{
    public class PessoaDetalhesDTO
    {
        public string categoria_descricao { get; set; }
        public string categoria_finalidade { get; set; }
        public string transacao_descricao { get; set; }
        public string transacao_tipo { get; set; }
        public decimal total_receita { get; set; }
        public decimal total_despesa { get; set; }
        public decimal total_liquido { get; set; }

    }
}
