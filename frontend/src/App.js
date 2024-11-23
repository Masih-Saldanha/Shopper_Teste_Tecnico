import { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import GeneralContext from "./contexts/generalContext";
import ErrorPage from "./pages/ErrorPage";
import Main from "./pages/Main";

function App() {
  const contextValue = useMemo(() => ({
    global: "Contexto Global",
    teste: "Teste"
  }), []);

  return (
    <GeneralContext.Provider value={contextValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<ErrorPage />}></Route>
          <Route path="/" element={<Main />}></Route>
        </Routes>
      </BrowserRouter>
    </GeneralContext.Provider>
  );
}

export default App;
