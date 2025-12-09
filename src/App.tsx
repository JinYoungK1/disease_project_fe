import { BrowserRouter, Route, Routes } from 'react-router-dom';

import DashboardPage from '~/pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<DashboardPage />} />
        <Route path={'/main'} element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
