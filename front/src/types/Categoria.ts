// Interface da pessoa usada na aplicação e nas respostas da API
export interface Categoria {
  id?: number;
  descricao: string;
  finalidade: string;
}
// Quando cadastramos, não enviamos o id, então usamos Omit para remover o id da interface Categoria.
export type CriarCategoria = Omit<Categoria, 'id'>;
