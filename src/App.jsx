import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AxisPage from "./pages/AxisPage";
import ThemeDetailPage from "./pages/ThemeDetailPage";
import { loadAgenda } from "./utils/loadAgenda";

export default function App() {
  const [agenda, setAgenda] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAgenda().then((data) => {
      setAgenda(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div style={{ padding: 40 }}>Carregando agenda…</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage data={agenda} />} />
        <Route path="/eixo/:axisName" element={<AxisPage data={agenda} />} />
        <Route path="/concluidos" element={<AxisPage data={agenda} concludedMode />} />
        <Route path="/tema/:axisName/:itemCode" element={<ThemeDetailPage data={agenda} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}