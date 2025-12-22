namespace ControleGastos.Models
{
    public class Categoria
    {
        // Aqui definimos as propriedades que receberão os valores para serem incluídos no banco de dados
        public int id { get; set; }
        public string descricao { get; set; }
        public string finalidade { get; set; }

    }
}
