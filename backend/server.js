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

app.post("/reg", async (req, res) => {
  try {
    const { full_name, phone, login, password } = req.body;
    await connection.query(
      "INSERT INTO user (id_role, login, password, full_name, phone) VALUES (1, ?, ?, ?, ?)",
      [login, password, full_name, phone]
    );
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false });
  }
});

app.post('/loginUser', async (req, res) => {
  try {
    const { login, password } = req.body;
    const [results] = await connection.query(
      "SELECT u.id, u.login, u.full_name, u.phone, r.code as role_code FROM user u JOIN role r ON u.id_role = r.id WHERE u.login = ? AND u.password = ?",
      [login, password]
    );
    res.json(results.length > 0 ? { success: true, data: results } : { success: false, data: [] });
  } catch (error) {
    res.json({ success: false, data: [] });
  }
});

app.get('/masters', async (req, res) => {
  const [results] = await connection.query("SELECT * FROM master");
  res.json({ masters: results });
});

app.get('/requests', async (req, res) => {
  const [results] = await connection.query(
    "SELECT r.*, m.name as master_name, s.name as status_name FROM request r JOIN master m ON r.id_master = m.id JOIN status s ON r.id_status = s.id"
  );
  res.json(results);
});

app.get('/requests/:userId', async (req, res) => {
  const [results] = await connection.query(
    "SELECT r.*, m.name as master_name, s.name as status_name FROM request r JOIN master m ON r.id_master = m.id JOIN status s ON r.id_status = s.id WHERE r.id_user = ?",
    [req.params.userId]
  );
  res.json(results);
});

app.post('/requests', async (req, res) => {
  const { user_id, master_id, booking_datetime } = req.body;
  await connection.query(
    "INSERT INTO request (id_user, id_master, id_status, booking_datetime) VALUES (?, ?, 1, ?)",
    [user_id, master_id, booking_datetime]
  );
  res.json({ success: true });
});

app.get('/users', async (req, res) => {
  const [results] = await connection.query("SELECT id, full_name, phone FROM user");
  res.json({ success: true, users: results });
});

app.put('/requests/status', async (req, res) => {
  const { request_id, status_id } = req.body;
  await connection.query("UPDATE request SET id_status = ? WHERE id = ?", [status_id, request_id]);
  res.json({ success: true });
});

app.listen(5000, () => console.log('Сервер запущен'));