import { createRoot } from 'react-dom/client';
import './main.css';
import Kitchen from './routes/Kitchen.tsx';
import Login from './routes/Login.tsx';
import Items from './routes/Items.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import Menu from './routes/Menu.tsx';
import MenuItems from './routes/MenuItems.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('container')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Navigate to="/cozinha/cardapio" />} />
        <Route path="/cardapio" element={<Menu />} />
        <Route path="/cardapio/:category" element={<MenuItems />} />
        <Route path="/cozinha/cardapio/:category" element={<Items />} />
        <Route path="/cozinha/cardapio" element={<Kitchen />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </QueryClientProvider>
  </BrowserRouter>
);