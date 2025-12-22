using ControleGastos.Data;
using ControleGastos.Dtos;
using ControleGastos.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Services
{
    public class TransacaoService
    {

        private readonly AppDbContext _context;
        public TransacaoService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ResultadoService> CadastraTransacao([FromBody] TransacaoDTO transacaoDTO)
        {
            try
            {
                var pessoa = await _context.pessoa.FirstOrDefaultAsync(p => p.id == transacaoDTO.pessoa_id && p.idade < 18);
                /// PRIMEIRA VERIFICAÇÃO: Se o usuário for menor que 18 anos e o tipo estiver como "RECEITA", então retornará a mensagem
                if ((pessoa != null && transacaoDTO.tipo == "RECEITA"))
                {
                    return new ResultadoService
                    {
                        Sucesso = false,
                        Mensagem = "Gentileza notar que menores de 18 anos não podem cadastrar o tipo como RECEITA"
                    };
                }

                ///SEGUNDA VERIFICAÇÃO: Caso o tipo seja diferente da finalidade, retornar erro de incompatibilidade.
                var categoria = await _context.categoria.FirstOrDefaultAsync(c => c.id == transacaoDTO.categoria_id);
                if (categoria != null && transacaoDTO.tipo != categoria.finalidade && categoria.finalidade != "AMBAS")
                {
                    return new ResultadoService
                    {
                        Sucesso = false,
                        Mensagem = $"O tipo é '{transacaoDTO.tipo}', mas a finalidade da categoria é '{categoria.finalidade}'. Notar que não pode haver incompatibilidade."
                    };
                }

                /// Inserindo os dados na tabela transacao
                var transacao = new Transacao
                {
                    descricao = transacaoDTO.descricao,
                    valor = transacaoDTO.valor,
                    tipo = transacaoDTO.tipo,
                    categoria_id = transacaoDTO.categoria_id,
                    pessoa_id = transacaoDTO.pessoa_id,
                };

                _context.transacao.Add(transacao);
                await _context.SaveChangesAsync();

                return new ResultadoService { Sucesso = true, Mensagem = "Cadastrado com sucesso!" };
            }
            catch (DbUpdateException)
            {
                return new ResultadoService
                {
                    Sucesso = false,
                    Mensagem = "Erro ao salvar no banco de dados"
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
        public async Task<List<ListaGastosDTO>> ListaGastos()
        {
            /// Faz um SELECT na tabela pessoa com LEFT JOIN nas tabelas transacao e categoria
            /// Objetivo: juntar todos os gastos por pessoa e trazer uma lista completa de todas as pessoas com seus totais de receitas, despesas e saldo líquido.
            return await _context.Database
                         .SqlQuery<ListaGastosDTO>($@"
                               SELECT
                                     p.id                                   AS pessoa_id,
                                     COALESCE(p.nome, '')                   AS pessoa_nome,
                                     COALESCE(MAX(p.idade), 0)              AS pessoa_idade,
                                     COALESCE(MAX(c.descricao), '')         AS categoria_descricao,
                                     COALESCE(MAX(c.finalidade), '')        AS categoria_finalidade,
                                     COALESCE(MAX(t.descricao), '')         AS transacao_descricao,
                                    	COALESCE(MAX(t.tipo), '')         	   AS transacao_tipo,
                                     COALESCE(SUM(t.valor) FILTER (WHERE UPPER(t.tipo) = 'RECEITA'), 0) AS total_receita,
                                     COALESCE(SUM(t.valor) FILTER (WHERE UPPER(t.tipo) = 'DESPESA'), 0) AS total_despesa,
                                     COALESCE(SUM(t.valor) FILTER (WHERE UPPER(t.tipo) = 'RECEITA'), 0)-
                                     COALESCE(SUM(t.valor) FILTER (WHERE UPPER(t.tipo) = 'DESPESA'), 0) AS total_liquido
                                 
                                 FROM pessoa   p
                                 LEFT JOIN transacao t ON p.id = t.pessoa_id
                                 LEFT JOIN categoria c ON t.categoria_id = c.id
                                 GROUP BY
      p.id, p.nome;

                         ")
    .ToListAsync();
        }
    }
}
