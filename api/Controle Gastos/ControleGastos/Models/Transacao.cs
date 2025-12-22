using Microsoft.AspNetCore.Http.HttpResults;

namespace ControleGastos.Models
{
    public class Transacao
    {
        // Aqui definimos as propriedades que receberão os valores para serem incluídos no banco de dados
        public int id { get; set; }
        public string descricao { get; set; }
        public decimal valor { get; set; }
        public string tipo { get;  set; }
        public int categoria_id { get; set; }
        public int pessoa_id { get; set; }
    }

}
