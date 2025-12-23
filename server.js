import express from 'express'
import connectToDB from './db.js'
import UserRoutes from './routes/user.js'

const app = express()
const PORT = process.env.PORT || 5000

// 1) Call DB connection
connectToDB()

// 2) Middleware to parse JSON
app.use(express.json());  // <--- Use this here

// OPTIONAL NOT MANDATORY
app.get('/', (req, res) => {
    console.log('I am inside home page route handler.');
    res.send('Hello Anand, Welcome to api development!')
})

// 3) Mount user routes at /api
app.use('/api', UserRoutes);  // e.g., GET /api/users

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}...`);
})