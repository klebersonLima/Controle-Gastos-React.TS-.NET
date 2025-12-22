namespace ControleGastos.Dtos
{
    public class ListaTotalCategoriaDTO
    {
        public int categoria_id { get; set; }
        public string categoria_descricao { get; set; }
        public string categoria_finalidade { get; set; }
        public decimal total_receita { get; set; }
        public decimal total_despesa { get; set; }
        public decimal total_liquido { get; set; }

    }
}
