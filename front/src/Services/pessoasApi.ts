import { Pessoa, CriarPessoa } from '../types/pessoa'; 

//Aqui estamos fazendo a consulta nos end points da api


const BASE_URL = 'https://localhost:7092/api/ControleGastos';

export const pessoasApi = {
  async listar(): Promise<Pessoa[]> {
    const response = await fetch(`${BASE_URL}/ListaPessoa`);
    if (!response.ok) throw new Error('Erro ao listar');
    return response.json();
  },

  async cadastrar(pessoa: CriarPessoa): Promise<void> {
    const response = await fetch(`${BASE_URL}/CadastraPessoa`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pessoa),
    });
    if (!response.ok) throw new Error('Erro ao cadastrar');
  },

  async excluir(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/DeletaPessoa/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Erro ao excluir');
  }
};
