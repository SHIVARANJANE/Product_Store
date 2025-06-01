import 'dotenv/config'
import path from 'path';
import express from 'express';
import connectDB from './config/db.js';
import productRoutes from './routes/product.route.js';
import userRoutes from './routes/users.route.js';
import cors from 'cors';

const host = "http://localhost";
const port = parseInt(process.env.PORT) || 5002;
const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

const __dirName = path.resolve();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirName, 'frontend/dist/')))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirName, 'frontend', 'dist', 'index.html'))
    })
}
app.listen(port, () => {
    connectDB();
    console.log(`Backend Server is running on ${host}:${port}`)
})