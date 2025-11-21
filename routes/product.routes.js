import { Router } from "express";
import { addProduct, updateProduct, deleteProduct, getAllProducts, getProductById } from "../controllers/product.controller.js";

const router = Router();

router.get("/:id", getProductById);
router.get("/", getAllProducts);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);


export default router;