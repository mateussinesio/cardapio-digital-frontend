import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8080/auth/login', {
        login: username,
        password: password
      }, { withCredentials: true });

      navigate('/cozinha/cardapio');
    } catch (error) {
      console.error('Erro ao fazer login', error);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="login-page-input-container">
            <input
              placeholder='Usuário'
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder='Senha'
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
