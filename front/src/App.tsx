import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import CadastroTransacao from "./views/CadastroTransacao";
import CadastroPessoa from "./views/CadastroPessoa";
import CadastraCategoria from "./views/CadastraCategoria";
import RelatorioCategoria from "./views/RelatorioCategoria";
import Header from "./views/Header";

function App() {
  return (
    <BrowserRouter>
    {/* fixando o header para todas as paginas */}
    <Header />
    {/* defindo as rotas para cada views */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/CadastroTransacao" element={<CadastroTransacao />} />
        <Route path="/CadastroPessoa" element={<CadastroPessoa />} />
        <Route path="/CadastraCategoria" element={<CadastraCategoria />} />
        <Route path="/RelatorioCategoria" element={<RelatorioCategoria />} />        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
