import { BrowserRouter, Route, Routes } from 'react-router-dom';

import DashboardPage from '~/pages/DashboardPage';
import DiseasePredictionPage from '~/pages/DiseasePredictionPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<DashboardPage />} />
        <Route path={'/main'} element={<DashboardPage />} />
        <Route path={'/disease-prediction'} element={<DiseasePredictionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
