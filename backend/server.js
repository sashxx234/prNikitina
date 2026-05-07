import express from "express";
import mysql from "mysql2/promise"; 
import cors from "cors";


const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "nails",
  password: "root"
});

const app = express();
app.use(cors(), express.json());


try {
  await connection.connect();
  console.log("Подключение к серверу MySQL успешно установлено");
} catch (err) {
  console.error("Ошибка: " + err.message);
}

app.post("/reg", async (req, res) => {
  try {
    const { full_name, phone, login, password } = req.body;
    await connection.promise().query(
      "INSERT INTO user (id_role, login, password, full_name, phone) VALUES (1, ?, ?, ?, ?)",
      [login, password, full_name, phone]
    );
    res.json({ success: true, Message: 'Успех' });
  } catch (error) {
    res.json({ success: false, Message: 'Ошибка' });
  }
});

app.post('/loginUser', async (req, res) => {
  try {
    const { login, password } = req.body;
    const [results] = await connection.promise().query(
      "SELECT u.id, u.login, u.full_name, u.phone, r.code as role_code FROM user u JOIN role r ON u.id_role = r.id WHERE u.login = ? AND u.password = ?",
      [login, password]
    );
    res.json(results.length > 0 ? { success: true, data: results } : { success: false, data: [] });
  } catch (error) {
    res.json({ success: false, data: [] });
  }
});

app.listen(5000, () => console.log('Сервер запущен'));