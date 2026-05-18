import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export function Req() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/auth');
      return;
    }
    if (user.login === 'beauty') {
      navigate('/admin');
      return;
    }
    fetchRequests(user.id);
  }, []);

  const fetchRequests = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/requests/${userId}`);
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <div>
      <h1>Ваши заявки</h1>
      {requests.length === 0 ? (
        <p>У вас пока нет заявок</p>
      ) : (
        <div>
          {requests.map(req => (
            <div key={req.id} style={{border: '1px solid #ccc', margin: '10px', padding: '10px'}}>
              <p><strong>Мастер:</strong> {req.master_name}</p>
              <p><strong>Дата и время:</strong> {new Date(req.booking_datetime).toLocaleString()}</p>
              <p><strong>Статус:</strong> {req.status_name}</p>
            </div>
          ))}
        </div>
      )}
      <br/>
      <button onClick={() => navigate('/form-req')}>Записаться</button>
      <button onClick={() => { localStorage.removeItem('user'); navigate('/auth'); }}>Выйти</button>
    </div>
  );
}