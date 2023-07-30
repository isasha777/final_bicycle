import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

import './AuthComponent.css';

const AuthComponent = () => {
  const { setAuthToken } = useContext(AuthContext);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  

  const handleLogin = () => {
   
    axios.post('https://sf-final-project-be.herokuapp.com/api/auth/sign_in', {
      email,
      password,
    })
    .then(response => {
      setAuthToken(response.data.auth_token);
      setLoggedIn(true);
    })
    .catch(error => {
      console.error('Ошибка при входе:', error);
    });
   
  };

  const handleLogout = () => {
    setAuthToken(null);
    setLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    // При монтировании компонента, проверяем состояние аутентификации в локальном хранилище и восстанавливаем его
    const storedAuthState = JSON.parse(localStorage.getItem('authState'));

    if (storedAuthState && storedAuthState.isLoggedIn) {
      setLoggedIn(true);
      setEmail(storedAuthState.email);
    }
  }, []);

  useEffect(() => {
    // При изменении состояния аутентификации, сохраняем его в локальное хранилище
    localStorage.setItem(
      'authState',
      JSON.stringify({ isLoggedIn, email })
    );
  }, [isLoggedIn, email]);

  return (
    <header className='headerAuth'>
      <nav className='navAuth'>
        <ul className='ulauth'>
          {isLoggedIn ? (
            <li className='liauth'>
              <span className='spanauth'>Привет, {email}!</span>
              <button className='buttonauth' onClick={handleLogout}>Выйти</button>
            </li>
          ) : (
            <li className='liauth'>
              <input className='inputauth'
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input className='inputauth'
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className='buttonauth' onClick={handleLogin}>Войти</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default AuthComponent;

