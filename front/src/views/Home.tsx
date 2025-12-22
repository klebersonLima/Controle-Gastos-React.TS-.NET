import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { NavLink, useNavigate } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="container mt-4">
        <div className="p-5 mb-4 bg-light rounded-3 shadow-sm">
          <div className="container-fluid py-5 text-center">
            <h1 className="display-5 fw-bold text-primary">
              Bem-vindo ao Controle de Gastos
            </h1>
            <p className="fs-5">
              Organize suas receitas, despesas e acompanhe o saldo de forma
              simples e visual.
            </p>
            <button
              type="button"
              className="btn btn-outline-primary btn-lg"
              onClick={() => (window.location.href = "/CadastroTransacao")}
            >
              Cadastrar novo lançamento
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
