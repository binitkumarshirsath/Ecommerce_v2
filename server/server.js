import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/db.js';
import authRoute from './routes/auth.js';
import categoryRoute from './routes/category.js'
import productRoute from './routes/product.js'
import cors from 'cors'

dotenv.config();
connectDb();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api',authRoute);
app.use('/api/category',categoryRoute);
app.use('/api/product',productRoute);

app.get('/',(req,res)=>{
    res.send('<h1>Welcome to the Binits Ecommerce app</h1>')
})

app.listen(process.env.PORT,()=>{
    console.log("Server is up and running at PORT : "+process.env.PORT);
})