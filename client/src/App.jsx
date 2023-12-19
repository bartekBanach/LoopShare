import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useAuthContext from './hooks/useAuthContext';
import Index from './pages/Index/Index';
import Layout from './pages/Layout';
import Upload from './pages/Upload/Upload';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Browse from './pages/Browse/Browse';
import User from './pages/User/User';
import useToastContext from './hooks/useToastContext';
import ToastsContainer from './components/ToastsContainer/ToastsContainer';

function App() {
  const { user } = useAuthContext();
  const toast = useToastContext();

  return (
    <BrowserRouter>
      <ToastsContainer toasts={toast.toasts} />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="browse" element={<Browse />} />
          <Route path="upload" element={!user ? <Navigate to="/" /> : <Upload />} />
          <Route path="login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="signup" element={user ? <Navigate to="/" /> : <Signup />} />
          <Route path="user/:userId" element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
