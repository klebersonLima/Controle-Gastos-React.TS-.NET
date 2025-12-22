import React, { useState } from "react";
import { useCategorias } from "../../Hooks/useCategorias";
import { CategoriaList } from "./CategoriaList";

// Este é o nosso componente principal
const CadastraCategoria = () => {
  // Usando o hook usePessoas para pegar os estados e funções
  const { categorias, loading, cadastrar } = useCategorias();
  //
  const [descricao, setDescricao] = useState("");
  const [finalidade, setFinalidade] = useState("");

  // chamando a função de cadastrar do hooks e passando o descricao e finalidade como argumento
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await cadastrar({ descricao, finalidade });
    setDescricao("");
    setFinalidade("");
  };

  return (
    <>
      <div className="min-vh-100 d-flex mt-5 justify-content-center bg-light p-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-8">
              <div className="card shadow border-0">
                <div className="card-header bg-primary text-white text-center py-3">
                  <h3 className="mb-0 fw-bold">Cadastro de Categoria</h3>
                </div>

                <div className="card-body p-4">
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3 mb-4">
                      <div className="col-md-5">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Descrição"
                          value={descricao}
                          onChange={(e) => setDescricao(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-3">
                        <select
                          className="form-select"
                          value={finalidade}
                          onChange={(e) =>
                            setFinalidade(
                              e.target.value as "RECEITA" | "DESPESA" | "AMBAS"
                            )
                          }
                          required
                        >
                          <option value="RECEITA">RECEITA</option>
                          <option value="DESPESA">DESPESA</option>
                          <option value="AMBAS">AMBAS</option>{" "}
                        </select>
                      </div>

                      <div className="col-md-4">
                        <button
                          type="submit"
                          className="btn btn-primary w-100 h-100"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2"></span>
                              Salvando...
                            </>
                          ) : (
                            "Salvar"
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                {/*Listar Categorias  */}
                <CategoriaList categorias={categorias} loading={loading} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CadastraCategoria;
