
import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { User } from "../models/User.js";
import { Product } from "../models/Product.js";

// Load .env variables
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  schema: process.env.PGSCHEMA,   
  ssl: {
    rejectUnauthorized: false
  },
  synchronize: true,
  logging: true,
  entities: [User, Product],
});

