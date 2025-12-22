using ControleGastos.Data;
using ControleGastos.Dtos;
using ControleGastos.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Services
{
    public class PessoaService
    {
        private readonly AppDbContext _context;
        public PessoaService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ResultadoService> DeletarPessoa(int id)
        {
            try
            {
                /// Verifica se existem transações para o usuário antes de deletar.
                var transacoes = _context.transacao.Where(t => t.pessoa_id == id);
                /// Se existirem transações, deleta todas do usuário.
                if (transacoes.Any())
                {
                    _context.transacao.RemoveRange(transacoes);
                    await _context.SaveChangesAsync();
                }

                /// Verifica se há pessoa com esse id.
                var pessoa = await _context.pessoa.FindAsync(id);
                if (pessoa == null)
                {
                    return new ResultadoService
                    {
                        Sucesso = false,
                        Mensagem = "Pessoa não encontrada"
                    };
                }

                /// Deleta o usuário da tabela pessoa.
                _context.pessoa.Remove(pessoa);
                await _context.SaveChangesAsync();

                return new ResultadoService
                {
                    Sucesso = true,
                    Mensagem = "Pessoa deletada com sucesso"
                };
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

        public async Task<List<Pessoa>> ListaPessoa()
        {
            ///Aqui estamos fazendo um select simples na tabela pesssoa
            return await _context.Database
                         .SqlQuery<Pessoa>($@"
                               SELECT            
                                      id,
                                      COALESCE(p.nome,'') AS nome,
                                      COALESCE(p.idade,0) AS idade
                                  FROM pessoa p
                         ")
                            .ToListAsync();
        }


        public async Task<List<PessoaDetalhesDTO>> ListaPessoaDetalhes(int id)
        {
            /// Como podemos observar, aqui está o SELECT que faz LEFT JOIN entre as tabelas pessoa, transacao e categoria
            /// Objetivo: listar todos os gastos do usuário em uma lista
            return await _context.Database
                         .SqlQuery<PessoaDetalhesDTO>($@"
                               SELECT
                                COALESCE(c.descricao, '')              AS categoria_descricao,
                                COALESCE(c.finalidade, '')             AS categoria_finalidade,
                                COALESCE(t.descricao, '')              AS transacao_descricao,
                                COALESCE(t.tipo, '')                   AS transacao_tipo,
                                COALESCE(SUM(t.valor) FILTER (WHERE UPPER(t.tipo) = 'RECEITA'), 0) AS total_receita,
                                COALESCE(SUM(t.valor) FILTER (WHERE UPPER(t.tipo) = 'DESPESA'), 0) AS total_despesa,
                                COALESCE(SUM(t.valor) FILTER (WHERE UPPER(t.tipo) = 'RECEITA'), 0) -
                                COALESCE(SUM(t.valor) FILTER (WHERE UPPER(t.tipo) = 'DESPESA'), 0) AS total_liquido
                            FROM pessoa p
                            LEFT JOIN transacao t ON p.id = t.pessoa_id
                            LEFT JOIN categoria c ON t.categoria_id = c.id
                            WHERE p.id = {id}
                            GROUP BY 
                                p.id,
                                p.nome,
                                p.idade,
                                c.descricao,
                                c.finalidade,
                                t.descricao,
                                t.tipo;
                            
                                                     ")
                        .ToListAsync();
        }

        /// Recebe JSON pelo DTO
        public async Task<ResultadoService> CadastraPessoa(PessoaDTO pessoaDTO)
        {
            /// Extrai os dados pra depois inserirmos no banco de dados
            var pessoa = new Pessoa
            {
                nome = pessoaDTO.nome,
                idade = pessoaDTO.idade
            };

            try
            {
                /// Salvando no banco de dados
                _context.pessoa.Add(pessoa);
                await _context.SaveChangesAsync();

                /// Retorna o resultado
                return new ResultadoService
                {
                    Sucesso = true,
                    Mensagem = $"Pessoa '{pessoa.nome}' cadastrada com ID {pessoa.id}"
                };
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
    }
}
