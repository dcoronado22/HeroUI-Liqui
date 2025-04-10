import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import VinculacionPage from "@/pages/VinculacionPage";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<VinculacionPage />} path="/vinculacion" />
    </Routes>
  );
}

export default App;
