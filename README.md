## Documentação da API – Controle de Gastos

Base URL: http://localhost:5042/api/ControleGastos/
Content-Type - application/json
ENDPOINTS e TABELA PostGreSQL

Endpoints para importação estão disponíveis na pasta Postman!

 PESSOA
---------

## /CadastraPessoa
json post
{
  "nome": "Maria Santos",
  "idade": 28
}

## /ListaPessoa
retorno get
[
  {
    "id": 1,
    "nome": "Maria Santos",
    "idade": 28
  }
]

## /PessoaDetalhes/{id}
retorno get
[
  {
    "categoria_descricao": "Moradia",
    "categoria_finalidade": "Despesa",
    "transacao_descricao": "Aluguel",
    "transacao_tipo": "Despesa",
    "total_receita": 0.00,
    "total_despesa": 1200.00,
    "total_liquido": -1200.00
  }
]

## /DeletaPessoa/{id}
retorno delete
{
  "sucesso": true,
  "mensagem": "Pessoa deletada com sucesso"
}

 CATEGORIA
------------

## /CadastraCategoria
json post
{
  "descricao": "Moradia",
  "finalidade": "Despesa"
}

## /ListaCategoria
retorno get
[
  {
    "id": 1,
    "descricao": "Moradia",
    "finalidade": "Despesa"
  }
]

## /ListaTotalCategoria
retorno get
[
  {
    "categoria_id": 1,
    "categoria_descricao": "Moradia",
    "categoria_finalidade": "Despesa",
    "total_receita": 0.00,
    "total_despesa": 1200.00,
    "total_liquido": -1200.00
  }
]

TRANSAÇÃO
------------

endpoint /CadastraTransacao
json post
{
  "descricao": "Aluguel",
  "valor": 1200.00,
  "tipo": "Despesa",
  "categoria_id": 1,
  "pessoa_id": 1
}

## /Listatransacoes
retorno get
[
  {
    "pessoa_id": 1,
    "pessoa_nome": "Maria Santos",
    "pessoa_idade": 28,
    "categoria_descricao": "Moradia",
    "categoria_finalidade": "Despesa",
    "transacao_descricao": "Aluguel",
    "transacao_tipo": "Despesa",
    "total_receita": 0.00,
    "total_despesa": 1200.00,
    "total_liquido": -1200.00
  }
]

## TABELAS CRIADAS NO PostGreSQL:

CREATE TABLE Pessoa (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    idade INTEGER NOT NULL
);


CREATE TABLE Categoria (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    descricao VARCHAR(200) NOT NULL,
    finalidade VARCHAR(10) NOT NULL
);

CREATE TABLE Transacao (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    descricao VARCHAR(200) NOT NULL,
    valor NUMERIC(10,2) NOT NULL,
    tipo VARCHAR(10) NOT NULL,
    categoria_id INTEGER NOT NULL,
    pessoa_id INTEGER NOT NULL
);

## Documentação do FrontEnd – Controle de Gastos

## 1- Instalar o React e TypeScript 
npx create-react-app front --template typescript
cd front
npm install

## 2- Instalar o router
npm install react-router-dom@latest

## 3- Instalar tipagens
npm install -D @types/react-router-dom@latest

Escolhi o metodo de views, types, services, hooks e components pois a estrutura do codigo fica melhor. 
De um arquivo de 2000+ linhas reduzida em 300/400 linhas.

Estou usando a pasta views para importar o meu componente principal, types para guardar as interfaces, services para montar a consulta na api https://localhost:7092/api/, hooks para montar a logica chamando a service, components para poder exibir o codigo front end e tbm expor as consultas e enviar formularios de cadastros.


