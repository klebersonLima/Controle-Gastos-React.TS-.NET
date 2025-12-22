import React from "react";
import { Categoria } from "../../types/Categoria";

//Esse componente é para listar as categoria cadastradas
// E ser chamada na nossa componente principal 'CadastraCategoria'

//definindo tudo que precisamos receber do nosso componente principal:
interface CategoriaProps {
  categorias: Categoria[]; // lista das categorias
  loading: boolean; // indica se houve um clique para mudar o estado
}

export const CategoriaList: React.FC<CategoriaProps> = ({
  categorias,
  loading,
}) => (
  <div className="card-footer p-4 bg-light">
    <h5 className="mb-3">Categorias Cadastradas</h5>

    {categorias.length === 0 ? (
      <p className="text-muted text-center mb-0">
        Nenhuma categoria cadastrada.
      </p>
    ) : (
      <div className="list-group list-group-flush">
        {categorias.map((categoria) => (
          <div
            key={categoria.id}
            className="list-group-item px-0 border-end-0 border-start-0"
          >
            <div className="d-flex justify-content-between align-items-center">
              <span className="fw-semibold me-3">{categoria.descricao}</span>
              <span className="badge bg-primary">{categoria.finalidade}</span>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
