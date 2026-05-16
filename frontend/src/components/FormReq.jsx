import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export function FormReq() {
  const [masters, setMasters] = useState([]);
  const [masterId, setMasterId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMasters = async () => {
      try {
        const response = await fetch('http://localhost:5000/masters');
        const data = await response.json();
        setMasters(data.masters);
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };
    fetchMasters();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!masterId || !date || !time) {
      setError('Заполните все поля');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const booking_datetime = `${date} ${time}:00`;

    try {
      const response = await fetch('http://localhost:5000/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          master_id: masterId,
          booking_datetime: booking_datetime
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('Заявка успешно создана');
        navigate('/req');
      } else {
        setError('Ошибка создания заявки');
      }
    } catch (error) {
      setError('Ошибка сервера');
    }
  };

  const timeSlots = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  return (
    <div>
      <h1>Новая запись</h1>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Мастер: </label>
          <select value={masterId} onChange={(e) => setMasterId(e.target.value)} required>
            <option value="">Выберите мастера</option>
            {masters.map(master => (
              <option key={master.id} value={master.id}>{master.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Дата: </label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          <label>Время: </label>
          <select value={time} onChange={(e) => setTime(e.target.value)} required>
            <option value="">Выберите время</option>
            {timeSlots.map(slot => (
              <option key={slot} value={slot.split(':')[0]}>{slot}</option>
            ))}
          </select>
        </div>
        <button type="submit">Записаться</button>
        <button type="button" onClick={() => navigate('/req')}>Назад</button>
      </form>
    </div>
  );
}