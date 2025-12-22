import React from 'react';
import { Pessoa } from '../../types/pessoa';

//Esse componente é para listar as pessoas cadastradas
// E ser chamada na nossa componente principal 'CadastroPessoa'

//definindo tudo que precisamos receber do nosso componente principal:
interface PessoaListProps {
  pessoas: Pessoa[]; // lista das pessoas
  loading: boolean; // indica se houve um clique para mudar o estado
  id: number | null; // caso seja exclusão, receberá o id
  onDeleteClick: (id: number) => void; // para chamar a função deletar
}

export const PessoaList: React.FC<PessoaListProps> = ({
  pessoas,
  loading,
  id,
  onDeleteClick
}) => (
  <div className="card-footer p-4 bg-light">
    <h5 className="mb-3">Pessoas Cadastradas</h5>
    
    {pessoas.length === 0 ? (
      <p className="text-muted text-center mb-0">Nenhuma pessoa cadastrada.</p>
    ) : (
      <div className="list-group list-group-flush">
        {pessoas.map((pessoa) => (
          <div key={pessoa.id || Math.random()} className="list-group-item px-0 border-end-0 border-start-0 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center flex-grow-1">
              <span className="fw-semibold me-3">{pessoa.nome}</span>
              <span className="badge bg-primary">{pessoa.idade} anos</span>
            </div>
            <button 
              className="btn btn-outline-danger btn-sm ms-2"
              onClick={() => pessoa.id && onDeleteClick(pessoa.id!)}
              disabled={id === pessoa.id}
            >
              {id === pessoa.id ? (
                <>
                  <span className="spinner-border spinner-border-sm me-1"></span>
                  Excluindo...
                </>
              ) : (
                'Excluir'
              )}
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);
