import express from 'express';
import { addToCart, fetchCart, removeFromCart } from '../controllers/cartController.js';
import authMiddleware from '../middleware/authMiddlerware.js';

const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware, addToCart);
cartRouter.post("/remove",authMiddleware, removeFromCart);
cartRouter.post("/get",authMiddleware, fetchCart);

export default cartRouter;