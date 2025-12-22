// Interface da pessoa usada na aplicação e nas respostas da API
export interface Transacao { 
  pessoa_id: number;
  pessoa_nome: string;
  pessoa_idade: number;
  categoria_descricao: string;
  categoria_finalidade: string;
  transacao_descricao: string;
  transacao_tipo: string;
  total_receita: number;
  total_despesa: number;
  total_liquido: number;
}
// Interface da categoria usada na aplicação e nas respostas da API
export interface Categoria {
  id: number;
  descricao: string;
  finalidade: string;
}
//Interface da Pessoa usada na aplicação e nas respostas da API
export interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}
// Interface de nova transação usada na aplicação e nas respostas da API
export interface NovaTransacao {
  descricao: string;
  valor: number;
  tipo: "RECEITA" | "DESPESA";
  categoria_id: number;
  pessoa_id: number;
}

// detalhe retornado por PessoaDetalhes/{id}
export interface DetalhePessoa {
  categoria_descricao: string;
  categoria_finalidade: string;
  transacao_descricao: string;
  transacao_tipo: string;
  total_receita: number;
  total_despesa: number;
  total_liquido: number;
}
