import { createRoot } from 'react-dom/client';
import './index.css';
import Kitchen from './routes/Kitchen.tsx';
import Login from './routes/Login.tsx';
import Items from './routes/Items.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import Menu from './routes/Menu.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('container')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Navigate to="/cardapio" />} />
        <Route path="/cardapio" element={<Menu />} />
        <Route path="/cardapio/:category" element={<Items />} />
        <Route path="/cozinha/cardapio/:category" element={<Items />} />
        <Route path="/cozinha/cardapio" element={<Kitchen />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </QueryClientProvider>
  </BrowserRouter>
);