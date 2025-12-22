import React, { useState, useEffect } from 'react';

interface Categoria {
  categoria_id: number;
  categoria_descricao: string;
  categoria_finalidade: 'RECEITA' | 'DESPESA' | 'AMBAS';
  total_receita?: number;
  total_despesa?: number;
  total_liquido?: number;
}

const CadastroCategoria: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const carregarCategorias = async () => {
    try {
      const response = await fetch('https://localhost:7092/api/ControleGastos/ListaTotalCategoria');
      const data: Categoria[] = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  const formatarMoeda = (valor: number | undefined): string => {
    if (valor === undefined || valor === null) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  return (
    <>
      <div className="min-vh-100 d-flex mt-5 justify-content-center bg-light p-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-8">
              <div className="card shadow border-0">
                <div className="card-header bg-success text-white text-center py-3">
                  <h3 className="mb-0 fw-bold">Resumo por Categoria</h3>
                </div>       
                <div className="card-footer p-4 bg-light">
                  <h5 className="mb-3">Categorias e Totais</h5>
                  
                  {categorias.length === 0 ? (
                    <p className="text-muted text-center mb-0">Nenhuma categoria encontrada.</p>
                  ) : (
                    <div className="list-group list-group-flush">
                      {categorias.map((categoria) => (
                        <div key={categoria.categoria_id} className="list-group-item px-0 border-end-0 border-start-0">
                          <div className="row align-items-center">
                            <div className="col-md-4">
                              <div>
                                <span className="fw-semibold">{categoria.categoria_descricao}</span>
                                <br />
                                <small className="text-muted">
                                  {categoria.categoria_finalidade === 'RECEITA' && 'Receita'}
                                  {categoria.categoria_finalidade === 'DESPESA' && 'Despesa'}
                                  {categoria.categoria_finalidade === 'AMBAS' && 'Receita/Despesa'}
                                </small>
                              </div>
                            </div>
                            <div className="col-md-8">
                              <div className="row text-end">
                                <div className="col-sm-4">
                                  <small className="text-muted">Receita</small>
                                  <div>{formatarMoeda(categoria.total_receita)}</div>
                                </div>
                                <div className="col-sm-4">
                                  <small className="text-muted">Despesa</small>
                                  <div>{formatarMoeda(categoria.total_despesa)}</div>
                                </div>
                                <div className="col-sm-4">
                                  <small className="fw-semibold">
                                    {categoria.total_liquido! >= 0 ? 'Lucro' : 'Prejuízo'}
                                  </small>
                                  <div className={`fw-bold ${categoria.total_liquido! >= 0 ? 'text-success' : 'text-danger'}`}>
                                    {formatarMoeda(categoria.total_liquido)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CadastroCategoria;
