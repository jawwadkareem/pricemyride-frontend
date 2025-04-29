import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CalculatePrice from '../pages/CalculatePrice';
import LoginPage from '../pages/auth/login/page';
import RecordEntries from '../pages/RecordEntries/page';
import SidebarLayout from '../commons/SideBarLayout';
import ProtectedRoute from './protectedRoute';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculate-price" element={<CalculatePrice />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/dashboard/records-entries" element={  
          <ProtectedRoute>
          <SidebarLayout>
          <RecordEntries />
          </SidebarLayout>
          </ProtectedRoute>
          } />
      </Routes>
    </Router>
  );
};

export default AppRouter;