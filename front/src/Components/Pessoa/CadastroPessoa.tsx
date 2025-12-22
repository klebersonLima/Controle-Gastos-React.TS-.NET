import React, { useState } from "react";
import { usePessoas } from "../../Hooks/usePessoas";
import { PessoaList } from "./PessoaList";
import { DeleteModal } from "./DeleteModal";

// Este é o nosso componente principal
const CadastroPessoa = () => {
  // Usando o hook usePessoas para pegar os estados e funções
  const { pessoas, loading, id, cadastrar, excluir } = usePessoas();
  //
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState(0);
  const [idDeletar, setIdDeletar] = useState<number | null>(null);  

  // Definindo a ação dos botões
  const handleDeleteClick = (id: number) => {
    setIdDeletar(id);           // ✅ CORRIGIDO: usa idDeletar
  };

  const handleConfirmDelete = async () => {
    if (idDeletar) {
      await excluir(idDeletar); // ✅ CORRIGIDO: usa idDeletar
      setIdDeletar(null);       // ✅ Fecha modal após deletar
      
    }
  };

  const handleCancelDelete = () => {
    setIdDeletar(null);         // ✅ Fecha modal de deletar
  };

  // chamando a função de cadastrar do hooks e passando o nome e idade como argumento
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await cadastrar({ nome, idade });
    setNome("");
    setIdade(0);
  };

  // Busca a pessoa selecionada pelo id para mostrar o nome dentro do modal
  const pessoaSelecionada = pessoas.find((p) => p.id === idDeletar);

  return (
    <>
      <div className="min-vh-100 d-flex mt-5 justify-content-center bg-light p-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-8">
              <div className="card shadow border-0">
                <div className="card-header bg-primary text-white text-center py-3">
                  <h3 className="mb-0 fw-bold">Cadastro de Pessoas</h3>
                </div>

                <div className="card-body p-4">
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3 mb-4">
                      <div className="col-md-5">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nome"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-3">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Idade"
                          value={idade}
                          onChange={(e) => setIdade(Number(e.target.value))}
                          required
                          min="0"
                        />
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
                {/*Listar Pesssoas  */}
                <PessoaList
                  pessoas={pessoas}
                  loading={loading}
                  id={id}
                  onDeleteClick={handleDeleteClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*Deletar Pessoa  */}
      <DeleteModal
        show={idDeletar !== null}
        pessoa={pessoaSelecionada}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default CadastroPessoa;
