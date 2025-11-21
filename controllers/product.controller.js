import { AppDataSource } from "../config/db.js";
// import { Product } from "../models/Product.js";


const repo = AppDataSource.getRepository("Product");

export const getAllProducts = async (req, res) => {
    try {
        const products = await repo.find();
        res.json({ message: "All products fetched", products });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await repo.findOne({
            where: { id: req.params.id }
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product fetched", product });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const addProduct = async (req, res) => {
    try {
        const product = repo.create(req.body);
        await repo.save(product);
        res.json({ message: "Product added", product });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const updateProduct = async (req, res) => {
    try {
        await repo.update(req.params.id, req.body);
        res.json({ message: "Product updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        await repo.delete(req.params.id);
        res.json({ message: "Product deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};