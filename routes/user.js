import express from 'express'
import User from '../models/user.model.js'

// Creating a router
const router = express.Router();

// // 1) READ all users GET => [http://localhost:3000/api/]
// router.get('/', async (req, res) => {
//     try {
//         // getting all users from DB!
//         const users = await User.find();
//         const totalCount = users.length;
//         // sending all the users as response!
//         res.status(200).json({ users, success: true, isLogin: true, totalCount });
//     } catch (err) {
//         res.status(500).json({ success: false, error: err.message });
//     }
// });

// API testing url => [http://localhost:3000/api/?page=1&limit=6]
router.get('/', async (req, res) => {
    try {
        // 1️) Get page & limit from query
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // 2️) Calculate skip
        const skip = (page - 1) * limit;

        // 3️) Fetch users with pagination
        const users = await User.find()
            .skip(skip)
            .limit(limit);

        // 4️) Get total count
        const totalUsers = await User.countDocuments();
        // 5️) Send response
        res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(totalUsers / limit),
            totalUsers,
            users
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


// 2) CREATE a new user, POST => [http://localhost:3000/api]
router.post('/', async (req, res) => {
    try {
        const { name, age, city, weight } = req.body;    // getting data from [req.body]
        const newUser = new User({ name, age, city, weight });
        const savedUser = await newUser.save();  // To save the data
        res.status(201).json({ success: true, savedUser });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

// 3) READ single user by ID, GET => [http://localhost:3000/api/:id]
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.status(200).json({ success: true, user });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 4) UPDATE user by ID, PUT => [http://localhost:3000/api/:id]
router.put('/:id', async (req, res) => {
    try {
        const { name, age, city, weight } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, age, city, weight },
            {
                new: true,             // return the updated document
                runValidators: true    // validate before updating
            }
        );
        if (!updatedUser) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.status(200).json({ success: true, data: updatedUser });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

// 5) PATCH user by ID, PATCH => [http://localhost:3000/api/:id]
// Partial object (only changed fields)
router.patch('/:id', async (req, res) => {
    try {
        const updates = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updates,
            {
                new: true,             // return the updated document
                runValidators: true    // apply schema validation
            }
        );
        if (!updatedUser) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.status(200).json({ success: true, data: updatedUser });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

// 6) DELETE user by ID, DELETE => [http://localhost:3000/api/:id]
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            data: deletedUser
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

export default router;