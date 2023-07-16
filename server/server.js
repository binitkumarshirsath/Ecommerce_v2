import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/db.js';
import authRoute from './routes/auth.js';
import categoryRoute from './routes/category.js'
import productRoute from './routes/product.js'
import paymentRoute from './routes/payment.js'
import orderRoute from './routes/order.js'
import cors from 'cors'
import Product from './model/productModel.js';
import path from 'path';

dotenv.config();
connectDb();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'../client/build')))

app.use('/api',authRoute);
app.use('/api/product',productRoute);
app.use('/api/category',categoryRoute);
app.use('/api',paymentRoute);
app.use('/api/order',orderRoute);

app.use('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'../client/build/index.html'))
})

app.listen(process.env.PORT,()=>{
    console.log("Server is up and running at PORT : "+process.env.PORT);
})