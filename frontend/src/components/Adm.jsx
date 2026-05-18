import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export function Adm() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.login !== 'beauty') {
      navigate('/auth');
      return;
    }
    fetchAllRequests();
  }, []);

  const fetchAllRequests = async () => {
    try {
      const response = await fetch('http://localhost:5000/requests');
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const updateStatus = async (requestId, newStatusId) => {
    try {
      const response = await fetch('http://localhost:5000/requests/status', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request_id: requestId, status_id: newStatusId })
      });
      
      if (response.ok) {
        fetchAllRequests();
      }
    } catch (error) {
      alert('Ошибка обновления статуса');
    }
  };

  const getStatusName = (statusId) => {
    const statuses = { 1: 'Новое', 3: 'Отменено', 4: 'Подтверждено' };
    return statuses[statusId] || 'Новое';
  };

  return (
    <div>
      <h1>Панель администратора</h1>
      <p>Все заявки в системе</p>
      
      {requests.length === 0 ? (
        <p>Нет заявок</p>
      ) : (
        <div>
          {requests.map(req => (
            <div key={req.id} style={{border: '1px solid #ccc', margin: '10px', padding: '10px'}}>
              <p><strong>ID заявки:</strong> {req.id}</p>
              <p><strong>Пользователь:</strong> {req.id_user}</p>
              <p><strong>Мастер:</strong> {req.master_name}</p>
              <p><strong>Дата и время:</strong> {new Date(req.booking_datetime).toLocaleString()}</p>
              <p><strong>Статус:</strong> {getStatusName(req.id_status)}</p>
              <div>
                <label>Изменить статус: </label>
                <select 
                  onChange={(e) => updateStatus(req.id, parseInt(e.target.value))} 
                  value={req.id_status}
                >
                  <option value="1">Новое</option>
                  <option value="4">Подтверждено</option>
                  <option value="3">Отменено</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <br/>
      <button onClick={() => { localStorage.removeItem('user'); navigate('/auth'); }}>Выйти</button>
    </div>
  );
}