import express from 'express';
import authUser from '../middleware/auth.js';
import { addToWishlist, deleteFromWishlist, getWishlist } from '../controllers/wishlist.controller.js';
const wishlistRouter = express.Router();

wishlistRouter.post('/get-wishlist',authUser,getWishlist);
wishlistRouter.post('/add-to-wishlist',authUser,addToWishlist);
wishlistRouter.post('/delete-wishlist',authUser,deleteFromWishlist);

export default wishlistRouter;