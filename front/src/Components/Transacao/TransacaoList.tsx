import React from "react";
import { Transacao } from "../../types/transacao";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

// Esse componente é para listar as Transações cadastradas
// E ser chamada na nossa componente principal 'CadastroTransacao'

//definindo tudo que precisamos receber do nosso componente principal:
interface TransacaoListProps {
  transacoes: Transacao[]; // lista das Transações
  loading: boolean; // indica se houve um clique para mudar o estado
  id: number | null; // caso seja exclusão, receberá o id
  onDeleteClick: (id: number) => void; // para chamar a função deletar
  onModalOpeen: (id: number) => void;
}

// // Definindo cor para receita e despesa
// const getTipoBadge = (tipo: string) => {
//   return tipo === "RECEITA" ? (
//     <Badge bg="success">RECEITA</Badge>
//   ) : (
//     <Badge bg="danger">DESPESA</Badge>
//   );
// };

export const TransacaoList: React.FC<TransacaoListProps> = ({
  transacoes,
  loading,
  id,
  onDeleteClick,
  onModalOpeen,
}) => {
  // Agora usa a prop transacoes (do hook)
  const totalReceitaGeral = transacoes.reduce(
    (soma, t) => soma + (t.total_receita || 0), // Adicionei || 0 para segurança
    0
  );

  const totalDespesaGeral = transacoes.reduce(
    (soma, t) => soma + (t.total_despesa || 0),
    0
  );

  const totalLiquidoGeral = transacoes.reduce(
    (soma, t) => soma + (t.total_liquido || 0),
    0
  );
  return (
    <>
      {/* Lista de Transações */}
      <div className="card shadow-lg border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <Table
              striped
              bordered
              hover
              responsive
              className="mb-0 table table-striped"
            >
              <thead className="table-primary">
                <tr>
                  <th>Pessoa</th>
                  <th>Idade</th>
                  <th>Receita</th>
                  <th>Despesa</th>
                  <th>Líquido</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {transacoes.length === 0 && (
                  <tr>
                    <td colSpan={9} className="text-center py-4">
                      <i className="bi bi-inbox fs-1 text-muted mb-2 d-block"></i>
                      Nenhuma transação encontrada.
                    </td>
                  </tr>
                )}

                {transacoes.map((t, index) => (
                  <tr key={`${t.pessoa_id}-${index}`}>
                    <td>
                      <strong>{t.pessoa_nome}</strong>
                    </td>
                    <td>{t.pessoa_idade}</td>
                    <td className="text-success fw-bold">
                      {t.total_receita.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="text-danger fw-bold">
                      {t.total_despesa.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td
                      className={
                        t.total_liquido >= 0
                          ? "text-success fw-bold"
                          : "text-danger fw-bold"
                      }
                    >
                      {t.total_liquido.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="text-center">
                      <div className="btn-group" role="group">
                        <Button
                          size="sm"
                          variant="outline-primary"
                          className="btn btn-outline-primary btn-sm ms-2"
                          onClick={() => onModalOpeen(t.pessoa_id)}
                        >
                          <i className="bi bi-list-ul me-1"></i>
                          Detalhes
                        </Button>
                        <button
                          className="btn btn-outline-danger btn-sm ms-2"
                          onClick={() =>
                            t.pessoa_id && onDeleteClick(t.pessoa_id!)
                          }
                          disabled={id === t.pessoa_id}
                        >
                          {id === t.pessoa_id ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-1"></span>
                              Excluindo...
                            </>
                          ) : (
                            "Excluir"
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="table-primary">
                <tr>
                  <th colSpan={2} className="text-start">
                    TOTAL GERAL:
                  </th>
                  <th className="text-success fw-bold">
                    {totalReceitaGeral.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </th>
                  <th className="text-danger fw-bold">
                    {totalDespesaGeral.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </th>
                  <th
                    className={
                      totalLiquidoGeral >= 0
                        ? "text-success fw-bold"
                        : "text-danger fw-bold"
                    }
                  >
                    {totalLiquidoGeral.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </th>
                  <th></th>
                </tr>
              </tfoot>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};
