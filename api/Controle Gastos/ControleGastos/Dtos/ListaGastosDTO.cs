namespace ControleGastos.Dtos
{
    public class ListaGastosDTO
    {
        public int pessoa_id { get; set; }
        public string pessoa_nome { get; set; }
        public int pessoa_idade { get; set; }
        public string categoria_descricao { get; set; }
        public string categoria_finalidade { get; set; }
        public string transacao_descricao { get; set; }
        public string transacao_tipo { get; set; }
        public decimal total_receita { get; set; }
        public decimal total_despesa { get; set; }
        public decimal total_liquido { get; set; }

    }
}
