//Aqui estamos fazendo a consulta nos end points da api

import {
  Transacao,
  Categoria,
  Pessoa,
  NovaTransacao,
  DetalhePessoa,
} from "../types/transacao";

const BASE_URL = "https://localhost:7092/api/ControleGastos";

export const transacaoApi = {
  async carregarTransacoes(): Promise<Transacao[]> {
    const response = await fetch(`${BASE_URL}/Listatransacoes`);
    if (!response.ok) throw new Error("Erro ao listar");
    return response.json();
  },

  async carregarCategorias(): Promise<Categoria[]> {
    const response = await fetch(`${BASE_URL}/ListaCategoria`);

    if (!response.ok) throw new Error("Erro ao listar");
    return response.json();
  },

  async carregarPessoa(): Promise<Pessoa[]> {
    const response = await fetch(`${BASE_URL}/ListaPessoa`);
    if (!response.ok) throw new Error("Erro ao listar");
    return response.json();
  },

 async cadastrarTransacao(novaTransacao: NovaTransacao) { 
  const response = await fetch(`${BASE_URL}/CadastraTransacao`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novaTransacao),
  });

  try {
    const resultado = await response.json();
    return resultado;
  } catch (error) {
    return {
      sucesso: false,
      mensagem: "Erro inesperado ao processar resposta da API"
    };
  }
}

,
  async carregarDetalhe(idPessoa: number): Promise<DetalhePessoa[]> {
    const response = await fetch(`${BASE_URL}/PessoaDetalhes/${idPessoa}`);   
    if (!response.ok) throw new Error("Erro ao listar");
    return response.json();
  },

  async excluir(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/DeletaPessoa/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao excluir");
  },
};
