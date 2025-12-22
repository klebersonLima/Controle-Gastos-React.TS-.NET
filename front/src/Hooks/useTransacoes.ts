import { useState, useEffect } from 'react';
import { Transacao,Categoria,Pessoa,NovaTransacao,DetalhePessoa } from '../types/transacao';
import { transacaoApi } from '../Services/transacaoApi';

// Aqui estamos montando um hooks para pode concentrar toda logica
export const useTransacoes = () => {
// Aqui estamos usando para pegar a lista que esta vindo do back end
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  // Aqui estamos usando para pegar a lista que esta vindo do back end
  const [categorias, setCategorias] = useState<Categoria[]>([]);
// Aqui estamos usando para pegar a lista que esta vindo do back end
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  // Aqui estamos usando para pegar a lista que esta vindo do back end
  const [detalhes, setDetalhes] = useState<DetalhePessoa[]>([]);
// Aqui para indicar se há uma ação. muda o estado do botão no click
  const [loading, setLoading] = useState(false);
//Aqui estamos guardando o valor do id para poder excluir o usuario
  const [id, setId] = useState<number | null>(null);

  const [erro, setErro] = useState<string | null>(null);



  // Listando as pessoas
  const carregarPessoas = async () => {
    try {
    //Chamando o metodo de listar
      const data = await transacaoApi.carregarPessoa();
      // setando o json em nossas propriedades no types
      setPessoas(data);
    } catch (error) {
      console.error('Erro ao carregar pessoas:', error);
    }
  };


    // Listando as Transacao
  const carregarTransacao = async () => {
    try {
    //Chamando o metodo de listar
      const data = await transacaoApi.carregarTransacoes();
      // setando o json em nossas propriedades no types
      setTransacoes(data);
    } catch (error) {
      console.error('Erro ao carregar Transações:', error);
    }
  };


     // Listando as Transacao
  const carregarCategoria = async () => {
    try {
    //Chamando o metodo de listar
      const data = await transacaoApi.carregarCategorias();
      // setando o json em nossas propriedades no types
      setCategorias(data);
    } catch (error) {
      console.error('Erro ao carregar categoria:', error);
    }
  };

   const CarregarDetalhes = async (idPessoa: number) => {
    try {
    //Chamando o metodo de listar
      const data = await transacaoApi.carregarDetalhe(idPessoa);
      // setando o json em nossas propriedades no types
      setDetalhes(data);
    } catch (error) {
      console.error('Erro ao carregar Detalhes:', error);
    }
  };


 const CadastrarTransacao = async (novaTransacao: NovaTransacao) => {
  setLoading(true);
  setErro(null);

  try {
    const resultado = await transacaoApi.cadastrarTransacao(novaTransacao);

    if (resultado.sucesso) {
      await carregarTransacao();
      setErro(null);
    } else {
      setErro(resultado.mensagem || "Erro ao cadastrar");
    }

    return resultado; // 👈 RETORNE O RESULTADO
  } catch (error) {
    setErro("Erro na comunicação com servidor");
    return { sucesso: false, mensagem: "Erro na comunicação com servidor" }; // 👈 retorno seguro
  } finally {
    setLoading(false);
  }
};


 // Excluindo pessoa
   const excluir = async (id: number) => {
     setId(id);
     try {
     // passando o id como argumento no nosso metodo para poder fazer a exclusão
       await transacaoApi.excluir(id);
       // atualizando a lista apos o cadastro
       carregarTransacao();
       carregarPessoas();
     } catch (error) {
       console.error('Erro ao deletar:', error);
     } finally {
       setId(null);
     }
   };
 
  useEffect(() => {
  carregarTransacao();
  carregarCategoria();
  carregarPessoas();
}, []);

// Adicionar para limpar erro quando muda
useEffect(() => {
  if (!loading && !erro) return;
}, [loading, erro]);

  //Retornando os valores do hooks pessoas
  return { transacoes, categorias, pessoas, detalhes, loading,id,CarregarDetalhes, CadastrarTransacao, excluir,erro}
};
