import bcrypt from "bcrypt";
import { AppDataSource } from "../config/db.js";
// import { User } from "../models/User.js";


const repo = AppDataSource.getRepository("User");


export const registerUser = async (req, res) => {
    try {
        const { name, username, password } = req.body;
        const hash = bcrypt.hashSync(password, 10);


        const user = repo.create({ name, username, password: hash });
        await repo.save(user);
        res.json({ message: "User registered", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;


        const user = await repo.findOneBy({ username });
        if (!user) return res.status(404).json({ message: "User not found" });


        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid password" });


        res.json({ message: "Login success", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};