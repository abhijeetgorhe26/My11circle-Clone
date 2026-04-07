import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
const __dirname = path.dirname(__filename);

// Declaring particular Variables
const app = express();
const port = 3000 || process.env.PORT;


// Middlewares

app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



// ── EJS Setup ──
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// path for logo
app.use('/Resource', express.static(path.join(__dirname, 'Resource')));

// importing functions from external reference
import connectDB from './utils/db.js';
import userRoute from './routes/userRoute.js'
import dashboard from './routes/dashBoardRoute.js';


// routes users middleware 


app.use('/api/auth', userRoute);


// routes
app.use('/dashboard', dashboard);

app.use((req, res, next) => {
    console.log(`📥 ${req.method} ${req.originalUrl}`);
    next();
});
app.get('/login', async (req, res) => {
    try {
        res.render('login');
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Failed to fetch data' });
    }
});


connectDB();

app.listen(port, () => {
    console.log("Server running on http://localhost:3000/login");
});

