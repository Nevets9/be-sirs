Berikut adalah versi yang dirapikan dan diformat secara profesional dari dokumentasi API Anda dalam format `README.md`:

---

# 📘 API Documentation

## 🔐 Authentication

### 🔸 Signup

**Endpoint:** `POST /api/v1/users/signup`
**Description:** Mendaftarkan user baru ke sistem.

#### Request Body

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "role": "pasien",
  "password": "yourpassword"
}
```

#### Response

```json
{
  "status": "success",
  "token": "jwt_token",
  "data": {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "role": "pasien"
    }
  }
}
```

---

### 🔸 Login

**Endpoint:** `POST /api/v1/users/login`
**Description:** Autentikasi user yang sudah terdaftar.

#### Request Body

```json
{
  "email": "johndoe@example.com",
  "password": "yourpassword"
}
```

#### Response

```json
{
  "status": "success",
  "token": "jwt_token"
}
```

---

## 👥 User Management

### 🔸 Get All Users

**Endpoint:** `GET /api/v1/users`
**Description:** Mengambil daftar seluruh pengguna.

#### Response

```json
{
  "status": "success",
  "result": 2,
  "data": {
    "users": [
      {
        "_id": "user_id_1",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "role": "pasien"
      },
      {
        "_id": "user_id_2",
        "name": "Jane Smith",
        "email": "janesmith@example.com",
        "role": "dokter"
      }
    ]
  }
}