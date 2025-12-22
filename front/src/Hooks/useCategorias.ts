import { useState, useEffect } from 'react';
import { Categoria, CriarCategoria } from '../types/Categoria';
import { CategoriaApi } from '../Services/CategoriaApi';

// Aqui estamos montando um hooks para pode concentrar toda logica
export const useCategorias = () => {
// Aqui estamos usando para pegar a lista que esta vindo do back end
  const [categorias, setcategorias] = useState<Categoria[]>([]);
// Aqui para indicar se há uma ação. muda o estado do botão no click
  const [loading, setLoading] = useState(false);

  // Listando as pessoas
  const carregarCategoria = async () => {
    try {
    //Chamando o metodo de listar
      const data = await CategoriaApi.listar();
      // setando o json em nossas propriedades no types
      setcategorias(data);
    } catch (error) {
      console.error('Erro ao carregar Categorias:', error);
    }
  };

  //Cadastrando as categoria
  const cadastrar = async (categoria: CriarCategoria) => {
    setLoading(true);
    try {
     //Chamando nosso metodo de cadastrar e passando os dados recebidos do front end   
      await CategoriaApi.cadastrar(categoria);
    // atualizando a lista apos o cadastro
      carregarCategoria();
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarCategoria();
  }, []);

  //Retornando os valores do hooks pessoas
  return { categorias, loading, cadastrar};
};
