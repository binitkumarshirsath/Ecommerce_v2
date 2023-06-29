import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/db.js';
import authRoute from './routes/auth.js';


dotenv.config();
connectDb();
const app = express();
app.use(express.json());

app.use('/api',authRoute);

app.get('/',(req,res)=>{
    res.send('<h1>Welcome to the Binits Ecommerce app</h1>')
})

app.listen(process.env.PORT,()=>{
    console.log("Server is up and running at PORT : "+process.env.PORT);
})