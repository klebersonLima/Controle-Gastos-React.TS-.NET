// Interface da pessoa usada na aplicação e nas respostas da API
export interface Pessoa {
  id?: number;
  nome: string;
  idade: number;
}
// Quando cadastramos, não enviamos o id, então usamos Omit para remover o id da interface Pessoa.
export type CriarPessoa = Omit<Pessoa, 'id'>;
