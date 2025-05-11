# 📘 API Documentation: Sistem Informasi Rekam Medis (SIRS)

**Base URL:** `https://be-sirs.vercel.app/api/v1`

---

## 🔐 Authentication

### POST `https://be-sirs.vercel.app/api/v1/users/signup`

**Description:** Register a new user (default role: pasien)

**Body:**

```json
{
  "email": "steven@gmail.com",
  "password": "asdasd"
}
```

**Response:**

```json
{
  "message": "Pasien berhasil didaftarkan",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjBlNzE5NGQ4MDkyYWM3NDljOWU1OSIsImlhdCI6MTc0Njk4Njc3NywiZXhwIjoxNzQ2OTg3Mjc3fQ.LhuQgDrKMBgKhvpzgpXqs47FhzYfhqVggTJ2wlCocMc",
  "pasien": {
    "id": "6820e7194d8092ac749c9e59",
    "email": "steven@gmail.com"
  }
}
```

---

### POST `https://be-sirs.vercel.app/api/v1/users/login`

**Description:** Login user

**Body:**

```json
{
  "email": "dokter1@example.com",
  "password": "dokter123"
  // "email": "steven@gmail.com",
  // "password": "asdasd"
}
```

**Response:**

**Description:** Login Dokter

```json
{
  "message": "Login berhasil",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjBlMWI2ZWMzODVlNWQzYTUzYmJhNyIsImlhdCI6MTc0Njk4NjU4MCwiZXhwIjoxNzQ2OTg3MDgwfQ.M_mOZTJxsToQx48yhElWfBqLS2se4isIJL-p47Lqflk",
  "user": {
    "_id": "6820e1b6ec385e5d3a53bba7",
    "dokterInfo": {
      "namaDokter": "Dr. Andi Wijaya",
      "spesialisasi": "Spesialis Penyakit Dalam"
    },
    "__v": 0
  }
}
```

**Response:**
**Description:** Login Pasien

```json
{
  "message": "Login berhasil",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjBlNzE5NGQ4MDkyYWM3NDljOWU1OSIsImlhdCI6MTc0Njk4Nzk0NiwiZXhwIjoxNzQ2OTg4NDQ2fQ.6PLA-qFifm3a2tj_GiaaZ2YEO80ifILM2lvycRE0EtU",
  "user": {
    "_id": "6820e7194d8092ac749c9e59",
    "__v": 0
  }
}
```

---

## 👤 User Management

### GET `https://be-sirs.vercel.app/api/v1/users`

**Response:**

```json
{
  "status": "success",
  "data": [
    {
      "_id": "6820e69de3d7be2684775223",
      "email": "tirta@gmail.com",
      "role": "dokter",
      "dokterInfo": {
        "namaDokter": "Dr. Tirta",
        "spesialisasi": "Umum"
      },
      "__v": 0
    },
    {
      "_id": "6820e7194d8092ac749c9e59",
      "email": "steven@gmail.com",
      "role": "pasien",
      "__v": 0
    }
  ]
}
```

### GET `https://be-sirs.vercel.app/api/v1/users/:id`

**Response:**

```json
{
  "status": "success",
  "data": {
    "_id": "6820e7194d8092ac749c9e59",
    "email": "steven@gmail.com",
    "role": "pasien",
    "__v": 0
  }
}
```

### DELETE `https://be-sirs.vercel.app/api/v1/users/:id`

**Response:**

```json
{
  "message": "Akun tidak ditemukan"
}
```

---

## 🩺 Dokter Management

### POST `https://be-sirs.vercel.app/api/v1/doctors`

**Admin only:** Tambahkan dokter dengan spesialisasi

**Body:**

```json
{
  "email": "tirta@gmail.com",
  "password": "asdasd",
  "namaDokter": "Dr. Tirta",
  "spesialisasi": "Umum"
}
```

**Response:**

```json
{
  "message": "Dokter berhasil didaftarkan",
  "dokter": {
    "id": "6820e69de3d7be2684775223",
    "email": "tirta@gmail.com",
    "namaDokter": "Dr. Tirta",
    "spesialisasi": "Umum"
  }
}
```

### GET `https://be-sirs.vercel.app/api/v1/doctors`

**Response:**

```json
{
  "status": "success",
  "data": [
    {
      "_id": "6820e69de3d7be2684775223",
      "email": "tirta@gmail.com",
      "role": "dokter",
      "dokterInfo": {
        "namaDokter": "Dr. Tirta",
        "spesialisasi": "Umum"
      },
      "__v": 0
    }
  ]
}
```

### GET `https://be-sirs.vercel.app/api/v1/doctors/:id`

**Response:**

```json
{
  "message": "success",
  "id": "6820e69de3d7be2684775223",
  "email": "tirta@gmail.com",
  "namaDokter": "Dr. Tirta",
  "spesialisasi": "Umum"
}
```

### DELETE `https://be-sirs.vercel.app/api/v1/doctors/:id`

```json
{
  "message": "Akun dokter berhasil dihapus"
}
```

---

## 📅 Janji Temu

### POST `https://be-sirs.vercel.app/api/v1/janjiTemu`

**Pasien only:** Buat janji temu

**Body:**

```json
{
  "idPasien": "6820e7194d8092ac749c9e59",
  "namaPasien": "John Doe",
  "nik": "1234567890",
  "umur": 30,
  "alamat": "Jl. Merdeka No. 123, Jakarta",
  "noHp": "081234567890",
  "idDokter": "6820e69de3d7be2684775223",
  "keluhan": "Mual DIare",
  "tanggal": "2025-05-12T10:00:00.000Z"
}
```

**Response:**

```json
{
  "message": "Janji temu berhasil dibuat",
  "data": {
    "pasien": {
      "idPasien": "6820e7194d8092ac749c9e59",
      "namaPasien": "John Doe",
      "nik": "1234567890",
      "umur": 30,
      "alamat": "Jl. Merdeka No. 123, Jakarta",
      "noHp": "081234567890"
    },
    "dokter": {
      "idDokter": "6820e69de3d7be2684775223"
    },
    "keluhan": "Mual DIare",
    "tanggal": "2025-05-12T10:00:00.000Z",
    "_id": "6820eaa05aa5531cf474850c",
    "createdAt": "2025-05-11T18:21:20.435Z",
    "updatedAt": "2025-05-11T18:21:20.435Z",
    "__v": 0
  }
}
```

### GET `https://be-sirs.vercel.app/api/v1/janjiTemu`

**Response:**

```json
{
  "status": "success",
  "result": 2,
  "data": [
    {
      "pasien": {
        "idPasien": {
          "_id": "6820e7194d8092ac749c9e59",
          "email": "steven@gmail.com"
        },
        "namaPasien": "John Doe",
        "nik": "1234567890",
        "umur": 30,
        "alamat": "Jl. Merdeka No. 123, Jakarta",
        "noHp": "081234567890"
      },
      "dokter": {
        "idDokter": {
          "_id": "6820e69de3d7be2684775223"
        }
      },
      "_id": "6820ea2a27e1037d8d455df9",
      "keluhan": "Sakit kepala dan demam tinggi",
      "tanggal": "2025-05-12T10:00:00.000Z",
      "createdAt": "2025-05-11T18:19:22.858Z",
      "updatedAt": "2025-05-11T18:19:22.858Z"
    },
    {
      "pasien": {
        "idPasien": {
          "_id": "6820e7194d8092ac749c9e59",
          "email": "steven@gmail.com"
        },
        "namaPasien": "John Doe",
        "nik": "1234567890",
        "umur": 30,
        "alamat": "Jl. Merdeka No. 123, Jakarta",
        "noHp": "081234567890"
      },
      "dokter": {
        "idDokter": {
          "_id": "6820e69de3d7be2684775223"
        }
      },
      "_id": "6820eaa05aa5531cf474850c",
      "keluhan": "Mual DIare",
      "tanggal": "2025-05-12T10:00:00.000Z",
      "createdAt": "2025-05-11T18:21:20.435Z",
      "updatedAt": "2025-05-11T18:21:20.435Z"
    }
  ]
}
```

### GET `https://be-sirs.vercel.app/api/v1/janji-temu/:id`

**Get 1 janji temu**
**Response:**

```json
{
  "status": "success",
  "data": {
    "pasien": {
      "idPasien": {
        "_id": "6820e7194d8092ac749c9e59",
        "email": "steven@gmail.com"
      },
      "namaPasien": "John Doe",
      "nik": "1234567890",
      "umur": 30,
      "alamat": "Jl. Merdeka No. 123, Jakarta",
      "noHp": "081234567890"
    },
    "dokter": {
      "idDokter": {
        "_id": "6820e69de3d7be2684775223"
      }
    },
    "_id": "6820ea2a27e1037d8d455df9",
    "keluhan": "Sakit kepala dan demam tinggi",
    "tanggal": "2025-05-12T10:00:00.000Z",
    "createdAt": "2025-05-11T18:19:22.858Z",
    "updatedAt": "2025-05-11T18:19:22.858Z"
  }
}
```

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

- Tambahkan `Authorization: Bearer <token>` di header semua endpoint yang butuh autentikasi

---

## 🧪 Testing via Postman

Gunakan koleksi Postman dengan urutan:

1. Auth → Login (dapatkan token)
2. Set token di header sebagai `Bearer <token>`
3. Jalankan endpoint sesuai role (admin/dokter/pasien)

---

Jika kamu membutuhkan koleksi Postman dalam bentuk file `.json`, saya bisa bantu buatkan juga.
