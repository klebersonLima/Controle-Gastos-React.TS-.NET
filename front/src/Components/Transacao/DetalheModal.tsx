import React from "react";
import { DetalhePessoa, Pessoa } from "../../types/transacao";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

// Componente para mostrar o detalhes dos gastos e receitas da pessoa

interface DetalheModalProps {
  id_Guardado: number | null;
  detalhes: DetalhePessoa[];
  pessoas: Pessoa[];
  carregandoDetalhes: boolean;
  fecharDetalhes: () => void;
}

export const DetalheModal: React.FC<DetalheModalProps> = ({
  id_Guardado,
  detalhes,
  pessoas,
  carregandoDetalhes,
  fecharDetalhes,
}) => {
  if (!id_Guardado) return null;
  const pessoa = pessoas.find((p) => p.id === id_Guardado); 
  return (
    <>
      {/* MODAL DETALHES */}
      {id_Guardado !== null && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex={-1}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Detalhes da Pessoa{" "}
                  {pessoas.find((p) => p.id === id_Guardado)?.nome}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={fecharDetalhes}
                ></button>
              </div>
              <div className="modal-body">
                {carregandoDetalhes && (
                  <div className="d-flex justify-content-center my-3">
                    <Spinner animation="border" size="sm" />
                  </div>
                )}

                {!carregandoDetalhes && detalhes.length === 0 && (
                  <p className="text-muted mb-0">
                    Nenhum detalhe encontrado para esta pessoa.
                  </p>
                )}

                {!carregandoDetalhes && detalhes.length > 0 && (
                  <div className="table-responsive">
                    <Table striped bordered hover size="sm">
                      <thead className="table-primary">
                        <tr>
                          <th>Categoria</th>
                          <th>Finalidade</th>
                          <th>Transação</th>
                          <th>Tipo</th>
                          <th>Receita</th>
                          <th>Despesa</th>
                          <th>Líquido</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detalhes.map((d, idx) => (
                          <tr key={idx}>
                            <td>{d.categoria_descricao}</td>
                            <td>{d.categoria_finalidade}</td>
                            <td>{d.transacao_descricao}</td>
                            <td>{d.transacao_tipo}</td>
                            <td className="text-success fw-bold">
                              {d.total_receita.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </td>
                            <td className="text-danger fw-bold">
                              {d.total_despesa.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </td>
                            <td
                              className={
                                d.total_liquido >= 0
                                  ? "text-success fw-bold"
                                  : "text-danger fw-bold"
                              }
                            >
                              {d.total_liquido.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={fecharDetalhes}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
