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
  "password": "asdasd",
  "nama": "steven"
}
```

**Response:**

```json
{
  "message": "Pasien berhasil didaftarkan",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjBmMjU5MTA5MzcwZjVjZWUwODAzMyIsImlhdCI6MTc0Njk4OTY1NywiZXhwIjoxNzQ2OTkwMTU3fQ.N_M09H3NR7aykcYxSC6oHLVjUnLN9TSeYkMXhpKFu0U",
  "pasien": {
    "id": "6820f259109370f5cee08033",
    "email": "steven2@gmail.com",
    "nama": "steven2"
  }
}
```

---

### POST `https://be-sirs.vercel.app/api/v1/users/login`

**Description:** Login Pasien

**Body:**

```json
{
  "email": "dokter1@example.com",
  "password": "dokter123"
  // "email": "steven@gmail.com",
  // "password": "asdasd"
}
```

**Description:** Login Dokter

```json
{
  "message": "Login berhasil",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjBmMTVjYmM4MGMwNTAwMjRkNTFlMyIsImlhdCI6MTc0Njk4OTgzOCwiZXhwIjoxNzQ2OTkwMzM4fQ.9m778NMeI_s5ROKUPcQvzW9Dp8CUxnGydCJ9aUIbf_k",
  "user": {
    "_id": "6820f15cbc80c050024d51e3",
    "nama": "Dr. Tirta",
    "dokterInfo": {
      "spesialisasi": "Umum"
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
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjBmMGU0MzBhY2Y2OGE2ZGJhZTliNiIsImlhdCI6MTc0Njk4OTc4MCwiZXhwIjoxNzQ2OTkwMjgwfQ.mfcoE6VygCtNNpqbFS3Yb0SZdX52aDmCxfuIABEBSCc",
  "user": {
    "_id": "6820f0e430acf68a6dbae9b6",
    "nama": "steven",
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
      "_id": "6820f0e430acf68a6dbae9b6",
      "nama": "steven",
      "email": "steven@gmail.com",
      "role": "pasien",
      "__v": 0
    },
    {
      "_id": "6820f15cbc80c050024d51e3",
      "nama": "Dr. Tirta",
      "email": "tirta@gmail.com",
      "role": "dokter",
      "dokterInfo": {
        "spesialisasi": "Umum"
      },
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
    "_id": "6820f15cbc80c050024d51e3",
    "nama": "Dr. Tirta",
    "email": "tirta@gmail.com",
    "role": "dokter",
    "dokterInfo": {
      "spesialisasi": "Umum"
    },
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
  "email": "tirta2@gmail.com",
  "password": "asdasd",
  "nama": "Dr. Tirta2",
  "spesialisasi": "Umum"
}
```

**Response:**

```json
{
  "message": "Dokter berhasil didaftarkan",
  "dokter": {
    "id": "6820f29c2703ebf2008219a3",
    "email": "tirta2@gmail.com",
    "nama": "Dr. Tirta2",
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
      "_id": "6820f15cbc80c050024d51e3",
      "nama": "Dr. Tirta",
      "email": "tirta@gmail.com",
      "role": "dokter",
      "dokterInfo": {
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
  "id": "6820f15cbc80c050024d51e3",
  "email": "tirta@gmail.com",
  "nama": "Dr. Tirta",
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

### GET `https://be-sirs.vercel.app/api/v1/janjiTemu/:id`

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

### POST `https://be-sirs.vercel.app/api/v1/pemeriksaan`

**Dokter only:** Input hasil pemeriksaan pasien

**Body:**

```json
{
  "janjiTemu": "6820ea2a27e1037d8d455df9",
  "analisa": "Pasien mengalami demam tinggi selama 3 hari, kemungkinan infeksi virus.",
  "resepObat": "Paracetamol 500mg, diminum 3 kali sehari setelah makan"
}
```

**Response:**

```json
{
  "message": "Pemeriksaan berhasil dibuat",
  "data": {
    "janjiTemu": "6820ea2a27e1037d8d455df9",
    "analisa": "Pasien mengalami demam tinggi selama 3 hari, kemungkinan infeksi virus.",
    "resepObat": "Paracetamol 500mg, diminum 3 kali sehari setelah makan",
    "_id": "6820f76dbf8df6359cdfb09e",
    "createdAt": "2025-05-11T19:15:57.308Z",
    "updatedAt": "2025-05-11T19:15:57.308Z",
    "__v": 0
  }
}
```

### GET `https://be-sirs.vercel.app/api/v1/pemeriksaan`

**Response:**

```json
{
  "message": "Success",
  "data": [
    {
      "_id": "6820f76dbf8df6359cdfb09e",
      "janjiTemu": {
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
        "_id": "6820ea2a27e1037d8d455df9",
        "keluhan": "Sakit kepala dan demam tinggi",
        "tanggal": "2025-05-12T10:00:00.000Z",
        "createdAt": "2025-05-11T18:19:22.858Z",
        "updatedAt": "2025-05-11T18:19:22.858Z",
        "__v": 0
      },
      "analisa": "Pasien mengalami demam tinggi selama 3 hari, kemungkinan infeksi virus.",
      "resepObat": "Paracetamol 500mg, diminum 3 kali sehari setelah makan",
      "createdAt": "2025-05-11T19:15:57.308Z",
      "updatedAt": "2025-05-11T19:15:57.308Z",
      "__v": 0
    }
  ]
}
```

### GET `https://be-sirs.vercel.app/api/v1/pemeriksaan/:id`

**Response:**

```json
{
  "message": "Success",
  "data": {
    "_id": "6820f76dbf8df6359cdfb09e",
    "janjiTemu": {
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
      "_id": "6820ea2a27e1037d8d455df9",
      "keluhan": "Sakit kepala dan demam tinggi",
      "tanggal": "2025-05-12T10:00:00.000Z",
      "createdAt": "2025-05-11T18:19:22.858Z",
      "updatedAt": "2025-05-11T18:19:22.858Z",
      "__v": 0
    },
    "analisa": "Pasien mengalami demam tinggi selama 3 hari, kemungkinan infeksi virus.",
    "resepObat": "Paracetamol 500mg, diminum 3 kali sehari setelah makan",
    "createdAt": "2025-05-11T19:15:57.308Z",
    "updatedAt": "2025-05-11T19:15:57.308Z",
    "__v": 0
  }
}
```

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
