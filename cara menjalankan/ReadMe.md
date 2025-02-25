-- Di sarankan menggunakan node.js versi terbaru
-- Pastikan install NPM atau yarn
-- Menggunakan Database MySQL
-- Postman (opsional) untuk tes API
-- Di sini saya menggunakan sweetalert2 sebagai alert atau notifikasi

-- Buat file .env di backend dengan setup sebagai berikut :
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS="PASSWORD YANG ANDA MILIKI"
DB_NAME=tes-bolde
JWT_SECRET=supersecretkey
FRONTEND_URL=http://localhost:3000

-- Buat file .env.local di frontend dengan isi sebagai berikut :
NEXT_PUBLIC_API_URL=http://localhost:3000

-- Export database MySQL yang sudah saya kirim dengan nama tes-bolde
-- atau buat baru di PHP MyAdmin dengan struktur sebagau berikut : - buat tabel users - buat 4 kolom - kolom id (INT, PRIMARY, AUTO INCREMENT) - kolom username (VARCHAR 255) - kolom email (VARCHAR 255 dengan CONSTRAINT unique_email) - kolom password (VARCHAR 255)

-- Buka 2 Terminal untuk backend dan frontend
(backend menggunakan port 3000, frontend meggunakan port 3001)
-- Jalankan backend terlebih dahulu dan jalankan server dengan printah node server.js
-- Lanjut di Frontend jalankan perintah npm run dev
-- Test dengan url localhost::3001 di browser
-- Opsional, tes di Postman dengan endpoint sebagai berikut : - POST /register untuk register - POST /login untuk login user - GET /user untuk melihat data user dan JWT nya - PUT /user/update untuk mengedit profile

CATATAN PENTING : dalam pembuatannya ini, tentu saya menggunakan bantuan AI, di sini saya menggunakan ChatGPT untuk efisiensi waktu dan adaptasi dikarenakan saya memang lebih sering menggunakan PHP dan Laravel sehari-hari 😊😁😊😁🙏🙏
