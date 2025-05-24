// const express = require('express');
// const mysql = require('mysql2');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const port = 3000; // або 5000, або будь-який інший порт

// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // Підключення до бази
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'messagesdb'
// });

// // Підключення
// connection.connect(err => {
//   if (err) {
//     console.error('Помилка підключення до бази:', err);
//     return;
//   }
//   console.log('База даних підключена!');
// });

// // Маршрут для прийому даних з форми
// app.post('/submit-form', (req, res) => {
//   const { name, email } = req.body; // наприклад, ти відправляєш ім'я і емейл

//   const query = 'INSERT INTO твоя_таблиця (name, email) VALUES (?, ?)';
//   connection.query(query, [name, email], (err, result) => {
//     if (err) {
//       console.error('Помилка запису в базу:', err);
//       res.status(500).send('Помилка сервера');
//       return;
//     }
//     res.send('Дані збережено успішно!');
//   });
// });

// // Запуск сервера
// app.listen(port, () => {
//   console.log(`Сервер працює на http://localhost:${port}`);
// });
