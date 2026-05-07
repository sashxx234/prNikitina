import { useState } from "react";
import { useNavigate } from "react-router";

export function Reg() {
  const [full_name, setFull_name] = useState('');
  const [phone, setPhone] = useState('');
  const [auth, setAuth] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/reg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name, phone, login: auth, password })
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('Регистрация успешна');
        navigate('/auth');
      } else {
        setError('Ошибка регистрации');
      }
    } catch (error) {
      setError('Ошибка сервера');
    }
  };
  
  return (
    <div>
      <h2>Регистрация</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="ФИО" value={full_name} onChange={(e) => setFull_name(e.target.value)} required /><br/>
        <input type="tel" placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} required /><br/>
        <input type="text" placeholder="Логин" value={auth} onChange={(e) => setAuth(e.target.value)} required /><br/>
        <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required /><br/>
        <button type="submit">Зарегистрироваться</button>
        <button type="button" onClick={() => navigate('/auth')}>Вход</button>
      </form>
    </div>
  );
}