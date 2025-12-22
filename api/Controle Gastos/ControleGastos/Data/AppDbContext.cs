using Microsoft.EntityFrameworkCore;
using ControleGastos.Models;


namespace ControleGastos.Data
{
    public class AppDbContext : DbContext
    {
        /// <summary>
        /// Fazendo a conexão com as tabelas no banco de dados
        /// </summary>
        /// <param name="options"></param>
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Pessoa> pessoa { get; set; }
        public DbSet<Categoria> categoria { get; set; }
        public DbSet<Transacao> transacao { get; set; }
       

    }
}
