import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// Usnado o nav link para poder fazer a navegação entre as paginas
import { NavLink, useNavigate } from "react-router-dom";
function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="./Home">
            Controle de Gastos
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/Home">
                  Home
                </NavLink>
              </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="/CadastroTransacao">
                  Cadastro Transação
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/CadastroPessoa">
                  Cadastro Pessoa
                </NavLink>
              </li>
               <li className="nav-item">
                <NavLink className="nav-link" to="/CadastraCategoria">
                  Cadastro Categoria
                </NavLink>
              </li>
               <li className="nav-item">
                <NavLink className="nav-link" to="/RelatorioCategoria">
                  Relatorio Categoria
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Header;
