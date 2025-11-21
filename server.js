// // // index.js
// // require('dotenv').config();
// // const express = require('express');
// // const bcrypt = require('bcrypt'); // for hashing password
// // const { query } = require('./config/db');
// // const initDB = require('./models/user');

// // const app = express();
// // app.use(express.json());

// // const SCHEMA = process.env.PGSCHEMA || 'public';

// // // initialize DB then start server
// // (async () => {
// //   await initDB();

// //   // create user
// //   app.post('/users', async (req, res) => {
// //     try {
// //       const { name, email, password } = req.body;
// //       if (!name || !email || !password) {
// //         return res.status(400).json({ error: 'name, email and password required' });
// //       }
// //       const hashed = await bcrypt.hash(password, 10);
// //       const sql = `INSERT INTO ${SCHEMA}.users (name, email, password) VALUES ($1,$2,$3) RETURNING id, name, email, created_at;`;
// //       const values = [name, email, hashed];
// //       const result = await query(sql, values);
// //       res.status(201).json(result.rows[0]);
// //     } catch (err) {
// //       if (err.code === '23505') { // unique_violation
// //         return res.status(409).json({ error: 'Email already exists' });
// //       }
// //       console.error(err);
// //       res.status(500).json({ error: 'internal error' });
// //     }
// //   });

// //   // list users (no password)
// //   app.get('/users', async (req, res) => {
// //     try {
// //       const sql = `SELECT id, name, email, created_at FROM ${SCHEMA}.users ORDER BY id DESC LIMIT 100;`;
// //       const result = await query(sql);
// //       res.json(result.rows);
// //     } catch (err) {
// //       console.error(err);
// //       res.status(500).json({ error: 'internal error' });
// //     }
// //   });

// //   // get user by id
// //   app.get('/users/:id', async (req, res) => {
// //     try {
// //       const sql = `SELECT id, name, email, created_at FROM ${SCHEMA}.users WHERE id = $1;`;
// //       const result = await query(sql, [req.params.id]);
// //       if (result.rowCount === 0) return res.status(404).json({ error: 'Not found' });
// //       res.json(result.rows[0]);
// //     } catch (err) {
// //       console.error(err);
// //       res.status(500).json({ error: 'internal error' });
// //     }
// //   });

// //   // delete user
// //   app.delete('/users/:id', async (req, res) => {
// //     try {
// //       const sql = `DELETE FROM ${SCHEMA}.users WHERE id = $1 RETURNING id;`;
// //       const result = await query(sql, [req.params.id]);
// //       if (result.rowCount === 0) return res.status(404).json({ error: 'Not found' });
// //       res.json({ deleted: true, id: result.rows[0].id });
// //     } catch (err) {
// //       console.error(err);
// //       res.status(500).json({ error: 'internal error' });
// //     }
// //   });

// //   const port = process.env.PORT || 3000;
// //   app.listen(port, () => console.log(`Server listening on ${port}`));
// // })();


// // // app.js
// // const { getAllCustomers } = require('./models/customerModel');
 
// // (async () => {
// //   try {
// //     const customers = await getAllCustomers();
// //     console.log('Customer Data:');
// //     console.table(customers);
// //   } catch (err) {
// //     console.error('Error fetching customers:', err.message);
// //   } finally {
// //     process.exit();
// //   }
// // })();


// const express = require('express');
// // const cors = require('cors');
// const { getAllCustomers } = require('./models/customerModel');

// const app = express();
// const PORT = 5000;

// // Middlewares
// // app.use(cors());
// app.use(express.json());

// // API Route
// app.get('/api/customers', async (req, res) => {
//   try {
//     console.log("start")
//     const customers = await getAllCustomers();
//     console.log(customers)
//     res.status(200).json({
//       success: true,
//       data: customers
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching customers',
//       error: err.message
//     });
//   }
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });



import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/db.js";

import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";

// --------------------------
// APP INITIALIZATION
// --------------------------
const app = express();
app.use(cors());
app.use(express.json());

// --------------------------
// ROUTES
// --------------------------
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// --------------------------
// DATABASE + SERVER START
// --------------------------
AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected");

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

export default app;
