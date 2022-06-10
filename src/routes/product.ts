import express from 'express';
import { getProducts, createProduct, getAProduct, updateProduct, deleteProduct, likeAProduct } from '../controllers/product.controller';
const router = express.Router();

router.route('/api/products').get(getProducts);
router.route('/api/products').post(createProduct);
router.route('/api/products/:id').get(getAProduct);
router.route('/api/products/:id').put(updateProduct);
router.route('/api/products/:id').delete(deleteProduct);
router.route('/api/products/:id/like').post(likeAProduct);

export default router;

