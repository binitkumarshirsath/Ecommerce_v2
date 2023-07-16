import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/db.js';
import authRoute from './routes/auth.js';
import categoryRoute from './routes/category.js';
import productRoute from './routes/product.js';
import paymentRoute from './routes/payment.js';
import orderRoute from './routes/order.js';
import cors from 'cors';
import Product from './model/productModel.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

dotenv.config();
connectDb();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(cors());
// app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/api', authRoute);
app.use('/api/product', productRoute);
app.use('/api/category', categoryRoute);
app.use('/api', paymentRoute);
app.use('/api/order', orderRoute);

app.get('/',(req,res)=>{
    res.send("Welcome to Safaris Backend!");
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server is up and running at PORT: ' + PORT);
});
