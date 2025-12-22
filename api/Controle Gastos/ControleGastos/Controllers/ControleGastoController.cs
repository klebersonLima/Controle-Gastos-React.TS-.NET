using ControleGastos.Data;
using ControleGastos.Dtos;
using ControleGastos.Models;
using ControleGastos.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ControleGastos : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly PessoaService _pessoaService;
        private readonly TransacaoService _transacaoService;
        private readonly CategoriaService _categoriaService;
        public ControleGastos(AppDbContext context,  PessoaService pessoaService, TransacaoService transacaoService
            , CategoriaService categoriaService)
        {
            _context = context;
            _pessoaService = pessoaService;
            _transacaoService = transacaoService;
            _categoriaService = categoriaService;
        }
        /// Cadastra uma nova pessoa na base de dados.
        [HttpPost("CadastraPessoa")]
        public async Task<IActionResult> CadastraPessoa([FromBody] PessoaDTO pessoaDTO)
        {
            /// Chamando o metodo de cadastro passando o json como argumento
            var resultado = await _pessoaService.CadastraPessoa(pessoaDTO);

            /// Retorna o erro ou sucesso
            return resultado.Sucesso ? Ok(resultado) : BadRequest(resultado);
        }

        [HttpGet("ListaPessoa")]
        public async Task<IActionResult> ListaPessoa()
        {
            ///Chamando o metodo de listar Pessoas
            var resultado = await _pessoaService.ListaPessoa();
            ///Imprimindo o resultado que veio do metodo
            return Ok(resultado);
        }

        [HttpDelete("DeletaPessoa/{id}")]
        public async Task<IActionResult> DeletaPessoa(int id)
        {
            /// Chamando o metodo de deletar passando o id como argumento
            var resultado = await _pessoaService.DeletarPessoa(id);

            /// Retorna o erro ou sucesso
            return resultado.Sucesso ? Ok(resultado) : BadRequest(resultado);
        }
        [HttpGet("PessoaDetalhes/{id}")]
        public async Task<IActionResult> PessoaDetalhes(int id)
        {
            /// Chama o método PessoaDetalhes.
            /// Método adicionado para retornar detalhes do usuário e todas as suas transações específicas.
            var resultado = await _pessoaService.ListaPessoaDetalhes(id);

            return Ok(resultado);
        }

        [HttpPost("CadastraCategoria")]
        public async Task<IActionResult> CadastraCategoria([FromBody] CategoriaDTO categoriaDTO)
        {
            /// Chamando o metodo de cadastro passando o json como argumento
            var resultado = await _categoriaService.CadastraCategoria(categoriaDTO);

            /// Retorna o erro ou sucesso
            return resultado.Sucesso ? Ok(resultado) : BadRequest(resultado);
        }

        [HttpGet("ListaCategoria")]
        public async Task<IActionResult> ListaCategoria()
        {
            ///Chamando o metodo de listar Categoria
            var resultado = await _categoriaService.Lista();
            ///Imprimindo o resultado que veio do metodo
            return Ok(resultado);
        }
        [HttpGet("ListaTotalCategoria")]
        public async Task<IActionResult> ListaTotalCategoria()
        {
            ///Chamando o metodo de listar o total das categorias
            var resultado = await _categoriaService.ListaTotalCategoria();

            return Ok(resultado);
        }

        [HttpPost("CadastraTransacao")]
        public async Task<IActionResult> CadastraTransacao([FromBody] TransacaoDTO transacaoDTO)
        {
            ///Chamando o metodo de cadastrar pessoa pasando o json como argumento
            var resultado = await _transacaoService.CadastraTransacao(transacaoDTO);

            /// Retorna o erro ou sucesso
            return resultado.Sucesso ? Ok(resultado) : BadRequest(resultado);
        }


        [HttpGet("Listatransacoes")]
        public async Task<IActionResult> ListaTransacoesPorUsuario()
        {
            /// Chamando o metodo de listar Gastos
            var resultado = await _transacaoService.ListaGastos();
            ///Imprimindo o resultado que veio do metodo
            return Ok(resultado);
        }

    }
}
