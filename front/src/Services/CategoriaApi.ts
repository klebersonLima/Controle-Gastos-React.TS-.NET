import { Categoria, CriarCategoria } from '../types/Categoria'; 

//Aqui estamos fazendo a consulta nos end points da api
const BASE_URL = 'https://localhost:7092/api/ControleGastos';

export const CategoriaApi = {
  async listar(): Promise<Categoria[]> {
    const response = await fetch(`${BASE_URL}/ListaCategoria`);
    if (!response.ok) throw new Error('Erro ao listar');
    return response.json();
  },

  async cadastrar(categoria: CriarCategoria): Promise<void> {
    const response = await fetch(`${BASE_URL}/CadastraCategoria`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoria),
    });
    if (!response.ok) throw new Error('Erro ao cadastrar');
  },
};