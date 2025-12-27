import express from 'express'
import connectToDB from './db.js'
import UserRoutes from './routes/user.js'
import morgan from 'morgan'
import cors from 'cors'
import rateLimit from 'express-rate-limit'

const app = express()
const PORT = process.env.PORT || 5000

// ////////////////////////////////////////////////////////
// // 1) morgan, A third party middleware to log any http request.
// app.use(morgan('dev'))

// // 2) Enable CORS to use this API anywhere
// app.use(cors())

// // 3) Rate limit setup for our api [only 5 request on every 15 min]
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000,    // [15 minutes]
//     max: 5,     // limit each IP to 5 requests per windowMs
//     message: 'To many requests from this IP, please try after 15 minutes!',
//     standardHeaders: true,    // Return rate limit info in the `RateLimit`
//     legacyHeaders: false      // Disable the `X-RateLimit-*` headers
// })
// ////////////////////////////////////////////////////////

// 1) Call DB connection
connectToDB()

// 2) Built-in Middleware to parse JSON
app.use(express.json());  // <--- Use this here

// OPTIONAL NOT MANDATORY
app.get('/', (req, res) => {
    console.log('I am inside home page route handler.');
    res.send('Hello Anand, Welcome to api development!')
})

// 3) Mount user routes at /api
// app.use('/api', limiter, UserRoutes);  // e.g., GET /api/users
app.use('/api', UserRoutes);  // e.g., GET /api/users

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}...`);
})