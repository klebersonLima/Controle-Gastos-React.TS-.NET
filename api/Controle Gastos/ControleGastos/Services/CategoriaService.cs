using ControleGastos.Data;
using ControleGastos.Dtos;
using ControleGastos.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Services
{
    public class CategoriaService
    {
        private readonly AppDbContext _context;
        public CategoriaService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ResultadoService> CadastraCategoria(CategoriaDTO categoriaDTO)
        {
            try
            {
                /// Mapeia DTO para entidade
                var categoria = new Categoria
                {
                    descricao = categoriaDTO.descricao,
                    finalidade = categoriaDTO.finalidade,
                };

                /// Salvando no banco de dados
                _context.categoria.Add(categoria);
                await _context.SaveChangesAsync();

                /// Retorna sucesso
                return new ResultadoService
                {
                    Sucesso = true,
                    Mensagem = $"Categoria '{categoria.descricao}' cadastrada com sucesso"
                };
            }
            catch (DbUpdateException)
            {
                return new ResultadoService
                {
                    Sucesso = false,
                    Mensagem = "Erro ao salvar categoria no banco de dados"
                };
            }
            catch (Exception)
            {
                return new ResultadoService
                {
                    Sucesso = false,
                    Mensagem = "Erro interno do servidor"
                };
            }
        }

        public async Task<List<Categoria>> Lista()
        {
            ///Fazendo um select simples na tebela Categoria
            return await _context.Database
                         .SqlQuery<Categoria>($@"
                               SELECT 
                                       c.id,
                                      COALESCE(c.descricao,'') AS descricao,
                                      COALESCE(c.finalidade,'') AS finalidade
                                  FROM Categoria c
                         ")
                    .ToListAsync();
        }

        public async Task<List<ListaTotalCategoriaDTO>> ListaTotalCategoria()
        {
            /// Fazendo um SELECT na tabela transacao e um LEFT JOIN na tabela categoria com um GROUP BY no id categoria.
            /// Objetivo é buscar e somar todas as receitas e despesas e trazer o total líquido das categorias cadastradas na tabela transacao.
            return await _context.Database
                                 .SqlQuery<ListaTotalCategoriaDTO>($@"
                                       	 SELECT
	              c.id                                   AS categoria_id,
	              COALESCE(MAX(c.descricao), '')         AS categoria_descricao,
	              COALESCE(MAX(c.finalidade), '')        AS categoria_finalidade,
	              COALESCE(SUM(t.valor) FILTER (WHERE UPPER(t.tipo) = 'RECEITA'), 0) AS total_receita,
	              COALESCE(SUM(t.valor) FILTER (WHERE UPPER(t.tipo) = 'DESPESA'), 0) AS total_despesa,
	              COALESCE(SUM(t.valor) FILTER (WHERE UPPER(t.tipo) = 'RECEITA'), 0)-
	              COALESCE(SUM(t.valor) FILTER (WHERE UPPER(t.tipo) = 'DESPESA'), 0) AS total_liquido
	          
	          FROM transacao   t
	          LEFT JOIN categoria c ON c.id = t.categoria_id
	          GROUP BY
	      c.id;

                         ")
    .ToListAsync();
        }
    }
}
