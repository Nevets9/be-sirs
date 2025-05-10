# 📘 API Documentation: Sistem Informasi Rekam Medis (SIRS)

**Base URL:** `https://be-sirs.vercel.app/api/v1`

---

## 🔐 Authentication

### POST `https://be-sirs.vercel.app/api/v1/users/signup`

**Description:** Register a new user (default role: pasien)

**Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

* 201 Created + JWT token

---

### POST `https://be-sirs.vercel.app/api/v1/users/login`

**Description:** Login user

**Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

* 200 OK + JWT token

---

## 👤 User Management

### GET `https://be-sirs.vercel.app/api/v1/users`

**Admin only:** Get all users

### GET `https://be-sirs.vercel.app/api/v1/users/:id`

**Admin only:** Get user by ID

### PATCH `https://be-sirs.vercel.app/api/v1/users/:id`

**Admin only:** Update user by ID

### DELETE `https://be-sirs.vercel.app/api/v1/users/:id`

**Admin only:** Delete user by ID

---

## 🩺 Dokter Management

### POST `https://be-sirs.vercel.app/api/v1/dokter`

**Admin only:** Tambahkan dokter dengan spesialisasi dan poli

**Body:**

```json
{
  "name": "Dr. Ani",
  "email": "ani@example.com",
  "password": "123456",
  "spesialis": "Anak",
  "poli": "Poli Anak"
}
```

### GET `https://be-sirs.vercel.app/api/v1/dokter`

**Public:** Lihat semua dokter

### GET `https://be-sirs.vercel.app/api/v1/dokter/:id`

**Admin:** Get 1 dokter

### PATCH `https://be-sirs.vercel.app/api/v1/dokter/:id`

**Admin:** Update dokter

### DELETE `https://be-sirs.vercel.app/api/v1/dokter/:id`

**Admin:** Hapus dokter

---

## 📅 Janji Temu

### POST `https://be-sirs.vercel.app/api/v1/janji-temu`

**Pasien only:** Buat janji temu

**Body:**

```json
{
  "umur": 22,
  "dokter": "{dokterId}",
  "keluhan": "Demam dan batuk",
  "tanggal": "2025-05-10"
}
```

### GET `https://be-sirs.vercel.app/api/v1/janji-temu`

**Admin/Dokter:** Lihat semua janji temu hari ini

* Admin: lihat semua data
* Dokter: hanya nama-nama pasien

### GET `https://be-sirs.vercel.app/api/v1/janji-temu/:id`

**Get 1 janji temu**

### PATCH `https://be-sirs.vercel.app/api/v1/janji-temu/:id`

**Update janji temu**

### DELETE `https://be-sirs.vercel.app/api/v1/janji-temu/:id`

**Hapus janji temu**

---

## 🧾 Pemeriksaan Pasien

### POST `https://be-sirs.vercel.app/api/v1/periksa`

**Dokter only:** Input hasil pemeriksaan pasien

**Body:**

```json
{
  "namaPasien": "John Doe",
  "umur": 23,
  "namaDokter": "Dr. Ani",
  "analisa": "Infeksi saluran pernapasan",
  "resep": "Paracetamol 3x sehari"
}
```

### GET `https://be-sirs.vercel.app/api/v1/periksa`

**All:** Lihat riwayat pemeriksaan semua pasien

### GET `https://be-sirs.vercel.app/api/v1/periksa/:id`

**Get 1 data pemeriksaan**

### PATCH `https://be-sirs.vercel.app/api/v1/periksa/:id`

**Update pemeriksaan**

### DELETE `https://be-sirs.vercel.app/api/v1/periksa/:id`

**Delete pemeriksaan**

---

## 🔔 Notifikasi

### POST `https://be-sirs.vercel.app/api/v1/notifikasi/daftar`

**Pasien only:** Mendapatkan nomor antrian hari ini

### GET `https://be-sirs.vercel.app/api/v1/notifikasi/dokter`

**Dokter only:** Lihat daftar nama dan umur pasien hari ini

---

## 🛡️ Authorization Middleware

* Tambahkan `Authorization: Bearer <token>` di header semua endpoint yang butuh autentikasi

---

## 🧪 Testing via Postman

Gunakan koleksi Postman dengan urutan:

1. Auth → Login (dapatkan token)
2. Set token di header sebagai `Bearer <token>`
3. Jalankan endpoint sesuai role (admin/dokter/pasien)

---

Jika kamu membutuhkan koleksi Postman dalam bentuk file `.json`, saya bisa bantu buatkan juga.
