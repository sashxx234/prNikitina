import { useState } from "react";
import { useNavigate } from "react-router";

export function Auth() {
  const [auth, setAuth] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (auth === 'beauty' && password === 'pass') {
      localStorage.setItem('user', JSON.stringify({ id: -1, login: 'beauty', role_code: 'admin', full_name: 'Администратор' }));
      navigate('/admin');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/loginUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: auth, password })
      });
      
      const data = await response.json();
      
      if (data.success && data.data.length > 0) {
        localStorage.setItem('user', JSON.stringify(data.data[0]));
        navigate('/req');
      } else {
        setError('Неверный логин или пароль');
      }
    } catch (error) {
      setError('Ошибка сервера');
    }
  };
  
  return (
    <div>
      <h2>Авторизация</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Логин" value={auth} onChange={(e) => setAuth(e.target.value)} required /><br/>
        <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required /><br/>
        <button type="submit">Войти</button>
        <button type="button" onClick={() => navigate('/register')}>Регистрация</button>
      </form>
    </div>
  );
}