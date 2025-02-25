# README

##  Persyaratan
Pastikan Anda sudah menginstal dan menyiapkan hal-hal berikut sebelum menjalankan proyek:

- **Node.js** (disarankan versi terbaru)
- **NPM atau Yarn** (untuk mengelola dependensi)
- **Database MySQL** (digunakan untuk penyimpanan data)
- **Postman** *(opsional, untuk pengujian API)*
- **SweetAlert2** (digunakan sebagai notifikasi di frontend)

---

##  Konfigurasi Lingkungan
### **Backend (`.env`)**
Buat file `.env` di dalam folder backend dengan isi berikut:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS="PASSWORD ANDA"
DB_NAME=tes-bolde
JWT_SECRET=supersecretkey
FRONTEND_URL=http://localhost:3000
```

### **Frontend (`.env.local`)**
Buat file `.env.local` di dalam folder frontend dengan isi berikut:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

##  Database MySQL
Anda dapat **mengimpor database** `tes-bolde.sql` yang sudah dikirim atau membuat database baru di **phpMyAdmin** dengan struktur sebagai berikut:

1. **Buat database baru** bernama `tes-bolde`
2. **Buat tabel `users`** dengan struktur berikut:
   - `id` (INT, PRIMARY, AUTO_INCREMENT)
   - `username` (VARCHAR 255)
   - `email` (VARCHAR 255, dengan `CONSTRAINT unique_email`)
   - `password` (VARCHAR 255)

---

##  Menjalankan Proyek
### ** Menjalankan Backend**
1. **Buka terminal** dan pindah ke folder backend:
   ```sh
   cd backend
   ```
2. **Install dependensi:**
   ```sh
   npm install
   ```
3. **Jalankan server backend:**
   ```sh
   node server.js
   ```

### ** Menjalankan Frontend**
1. **Buka terminal lain** dan pindah ke folder frontend:
   ```sh
   cd frontend
   ```
2. **Install dependensi:**
   ```sh
   npm install
   ```
3. **Jalankan server frontend:**
   ```sh
   npm run dev
   ```
4. **Akses aplikasi di browser:**
   ```
   http://localhost:3001
   ```

---

##  Pengujian API di Postman
Gunakan **Postman** atau tools lainnya untuk menguji endpoint berikut:

| Method | Endpoint      | Deskripsi |
|--------|-------------|-----------|
| **POST** | `/register`   | Registrasi user baru |
| **POST** | `/login`      | Login user dan mendapatkan token JWT |
| **GET**  | `/user`       | Melihat data user (dengan token JWT) |
| **PUT**  | `/user/update` | Mengedit profil user (dengan token JWT) |

---

##  **Catatan Penting**
Dalam pembuatan proyek ini, saya menggunakan **bantuan AI (ChatGPT)** untuk efisiensi waktu dan adaptasi, karena saya lebih sering menggunakan **PHP & Laravel** dalam keseharian saya. 😊😁🙏


