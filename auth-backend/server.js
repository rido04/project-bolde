import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:3001", credentials: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url} - ${JSON.stringify(req.body)}`);
  next();
});

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) console.error("DB Connection Failed:", err);
  else console.log("Database tersambung");
});

// Middleware untuk verifikasi token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Tidak ada token" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Akses tidak sah" });

    req.user = decoded;
    next();
  });
};

// Register
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(sql, [username, email, hashedPassword], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    // Setelah user berhasil didaftarkan, buat token
    const token = jwt.sign({ id: result.insertId, email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Registrasi Berhasil", token });
  });
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ error: "User tidak ditemukan" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Password atau Username salah!" });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login Berhasil", token });
  });
});

// Update User
app.put("/user", verifyToken, (req, res) => {
  const { username, email, password } = req.body;
  const userId = req.user.id;

  let sql = "UPDATE users SET username = ?, email = ? WHERE id = ?";
  let params = [username, email, userId];

  if (password) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    sql = "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?";
    params = [username, email, hashedPassword, userId];
  }

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ message: "User Gagal diupdate", error: err.message });
    res.json({ message: "User diupdate!" });
  });
});

// Get User
app.get("/user", verifyToken, (req, res) => {
  const userId = req.user.id;

  db.query("SELECT id, username, email FROM users WHERE id = ?", [userId], (err, result) => {
    if (err) return res.status(500).json({ message: "Gagal menerima data user" });
    if (result.length === 0) return res.status(404).json({ message: "User tidak ditemukan" });

    res.json(result[0]);
  });
});

// Jalankan server
app.listen(process.env.PORT, () => console.log(`Menggunakan Port :  ${process.env.PORT}`));
