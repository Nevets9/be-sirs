Dokumentasi API
🔐 Autentikasi
🔸 Signup
POST /api/v1/users/signup

Request Body:
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "yourpassword"
}
Response:

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
🔸 Login
POST /api/v1/users/login

Request Body:
{
  "email": "johndoe@example.com",
  "password": "yourpassword"
}

Response:
{
  "status": "success",
  "token": "jwt_token"
}
👥 User Management
Endpoint berikut belum dilindungi middleware autentikasi.

🔸 Get All Users
GET /api/v1/users

Response:
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
      ...
    ]
  }
}