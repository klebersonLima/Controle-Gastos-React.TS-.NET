import { useState, useEffect } from 'react';
import { Pessoa, CriarPessoa } from '../types/pessoa';
import { pessoasApi } from '../Services/pessoasApi';

// Aqui estamos montando um hooks para pode concentrar toda logica
export const usePessoas = () => {
// Aqui estamos usando para pegar a lista que esta vindo do back end
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
// Aqui para indicar se há uma ação. muda o estado do botão no click
  const [loading, setLoading] = useState(false);
//Aqui estamos guardando o valor do id para poder excluir o usuario
  const [id, setId] = useState<number | null>(null);


  // Listando as pessoas
  const carregarPessoas = async () => {
    try {
    //Chamando o metodo de listar
      const data = await pessoasApi.listar();
      // setando o json em nossas propriedades no types
      setPessoas(data);
    } catch (error) {
      console.error('Erro ao carregar pessoas:', error);
    }
  };

  //Cadastrando as pessoas
  const cadastrar = async (pessoa: CriarPessoa) => {
    setLoading(true);
    try {
     //Chamando nosso metodo de cadastrar e passando os dados recebidos do front end   
      await pessoasApi.cadastrar(pessoa);
    // atualizando a lista apos o cadastro
      carregarPessoas();
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    } finally {
      setLoading(false);
    }
  };

  // Excluindo pessoa
  const excluir = async (id: number) => {
    setId(id);
    try {
    // passando o id como argumento no nosso metodo para poder fazer a exclusão
      await pessoasApi.excluir(id);
      // atualizando a lista apos o cadastro
      carregarPessoas();
    } catch (error) {
      console.error('Erro ao deletar:', error);
    } finally {
      setId(null);
    }
  };

  useEffect(() => {
    carregarPessoas();
  }, []);

  //Retornando os valores do hooks pessoas
  return { pessoas, loading, id, cadastrar, excluir };
};
