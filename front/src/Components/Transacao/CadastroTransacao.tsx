import React, { useState } from "react";
import { useTransacoes } from "../../Hooks/useTransacoes";
import { TransacaoList } from "./TransacaoList";
import { DetalheModal } from "./DetalheModal";
import { DeleteModal } from "./DeleteModal";
import { NovaTransacao } from "../../types/transacao";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Este é o nosso componente principal
const CadastroTransacao = () => {
  // Usando o hook useTransacoes para pegar os estados e funções
  const {
    transacoes,
    categorias,
    pessoas,
    detalhes,
    loading,
    id,
    CarregarDetalhes,
    CadastrarTransacao,
    excluir,
    erro,
  } = useTransacoes();

  const [idDetalhes, setIdDetalhes] = useState<number | null>(null);        
  const [idDeletar, setIdDeletar] = useState<number | null>(null);         
  const [carregandoDetalhes, setCarregandoDetalhes] = useState(false);
  const [novaTransacao, setNovaTransacao] = useState<NovaTransacao>({
    descricao: "",
    valor: 0,
    tipo: "DESPESA",
    categoria_id: 0,
    pessoa_id: 0,
  });

  //Deletar a Pessoa
  const handleDeleteClick = (id: number) => {
    setIdDeletar(id);           
    setIdDetalhes(null);        
  };
// Confirmar o delete. 
  const handleConfirmDelete = async () => {
    if (idDeletar) {
      await excluir(idDeletar); 
      setIdDeletar(null);       
      
    }
  };
  //Cancelar o Delete
  const handleCancelDelete = () => {
    setIdDeletar(null);         
  };
// Mostrar o Modal Detalhes.  É para mostrar todas as transações de um especifico usuario
  const handleModalClick = async (id: number) => {
    setIdDetalhes(id);          
    setIdDeletar(null);         
    setCarregandoDetalhes(true);
    try {
      await CarregarDetalhes(id);
    } finally {
      setCarregandoDetalhes(false);
    }
  };

  const transacaoSelecionada = transacoes.find((t) => t.pessoa_id === idDeletar);
// Função para cadastrar a transação
 const handleCadastrarTransacao = async (e: React.FormEvent) => {
  e.preventDefault();

  if (
    !novaTransacao.descricao ||
    !novaTransacao.valor ||
    novaTransacao.categoria_id === 0 ||
    novaTransacao.pessoa_id === 0
  ) {
    alert("Preencha todos os campos obrigatórios");
    return;
  }

  const resultado = await CadastrarTransacao(novaTransacao);

  if (resultado.sucesso) {
    alert(resultado.mensagem);
    setNovaTransacao({
      descricao: "",
      valor: 0,
      tipo: "DESPESA",
      categoria_id: 0,
      pessoa_id: 0,
    });
  } else {
    alert(resultado.mensagem); 
  }
};


  return (
    <>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-11">
            <h2 className="mb-4 text-center text-primary">
              <i className="bi bi-credit-card me-2"></i>
              Controle de Gastos
            </h2>

            {loading && (
              <div className="d-flex justify-content-center my-5">
                <Spinner animation="border" variant="primary" role="status">
                  <span className="visually-hidden">Carregando...</span>
                </Spinner>
              </div>
            )}

            {!loading && (
              <>
                {/* Formulário de Cadastro */}
                <div className="card shadow-lg border-0 mb-4">
                  <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">
                      <i className="bi bi-plus-circle me-2"></i>
                      Novo Lançamento
                    </h5>
                  </div>
                  <div className="card-body">
                    <Form onSubmit={handleCadastrarTransacao}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Descrição *</Form.Label>
                            <Form.Control
                              type="text"
                              value={novaTransacao.descricao}
                              onChange={(e) =>
                                setNovaTransacao({
                                  ...novaTransacao,
                                  descricao: e.target.value,
                                })
                              }
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group className="mb-3">
                            <Form.Label>Valor *</Form.Label>
                            <Form.Control
                              type="number"
                              step="0.01"
                              min="0"
                              value={novaTransacao.valor || ""}
                              onChange={(e) =>
                                setNovaTransacao({
                                  ...novaTransacao,
                                  valor: parseFloat(e.target.value) || 0,
                                })
                              }
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group className="mb-3">
                            <Form.Label>Tipo *</Form.Label>
                            <Form.Select
                              value={novaTransacao.tipo}
                              onChange={(e) =>
                                setNovaTransacao({
                                  ...novaTransacao,
                                  tipo: e.target.value as "RECEITA" | "DESPESA",
                                })
                              }
                              required
                            >
                              <option value="DESPESA">DESPESA</option>
                              <option value="RECEITA">RECEITA</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Categoria *</Form.Label>
                            <Form.Select
                              value={novaTransacao.categoria_id}
                              onChange={(e) =>
                                setNovaTransacao({
                                  ...novaTransacao,
                                  categoria_id: parseInt(e.target.value),
                                })
                              }
                              required
                            >
                              <option value={0}>Selecione uma categoria</option>
                              {categorias.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                  {cat.descricao} ({cat.finalidade})
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Pessoa *</Form.Label>
                            <Form.Select
                              value={novaTransacao.pessoa_id}
                              onChange={(e) =>
                                setNovaTransacao({
                                  ...novaTransacao,
                                  pessoa_id: parseInt(e.target.value),
                                })
                              }
                              required
                            >
                              <option value={0}>Selecione uma pessoa</option>
                              {pessoas.map((pessoa) => (
                                <option key={pessoa.id} value={pessoa.id}>
                                  {pessoa.nome} ({pessoa.idade} anos)
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                      <div className="d-flex gap-2">
                        <Button
                          type="submit"
                          variant="outline-primary"
                          className="fw-bold"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <Spinner
                                animation="border"
                                size="sm"
                                className="me-2"
                              />
                              Cadastrando...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-plus-circle me-2"></i>
                              Cadastrar
                            </>
                          )}
                        </Button>
                        <Button
                          type="button"
                          variant="outline-secondary"
                          onClick={() =>
                            setNovaTransacao({
                              descricao: "",
                              valor: 0,
                              tipo: "DESPESA",
                              categoria_id: 0,
                              pessoa_id: 0,
                            })
                          }
                          disabled={loading}
                        >
                          Limpar
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>

                {/* TABELA DE TRANSAÇÕES */}
                <TransacaoList
                  transacoes={transacoes}
                  loading={loading}
                  id={id}
                  onDeleteClick={handleDeleteClick}
                  onModalOpeen={handleModalClick}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/*  Modal de Detalhes */}
      <DetalheModal
        id_Guardado={idDetalhes}
        detalhes={detalhes}
        pessoas={pessoas}
        carregandoDetalhes={carregandoDetalhes}
        fecharDetalhes={() => setIdDetalhes(null)}
      />

      {/*  Modal de Deletar */}
      <DeleteModal
        show={idDeletar !== null}
        transacao={transacaoSelecionada}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default CadastroTransacao;
