import express from 'express'
import User from '../models/user.model.js'

// Creating a router
const router = express.Router();

// 1) READ all users (GET /api/users)
router.get('/', async (req, res) => {
    // console.log('GET REQUEST...');
    try {
        // getting all users from DB!
        const users = await User.find();
        const totalCount = users.length;
        // sending all the users as response!
        res.status(200).json({ users, success: true, isLogin: true, totalCount });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 2) CREATE a new user (POST /api/users)
router.post('/', async (req, res) => {
    // console.log('POST REQUEST...');
    try {
        const { name, age, city, weight } = req.body;    // getting data from [req.body]
        const newUser = new User({ name, age, city, weight });
        const savedUser = await newUser.save();  // To save the data
        res.status(201).json({ success: true, savedUser });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

// 3) READ single user by ID (GET /api/users/:id)
router.get('/:id', async (req, res) => {
    // console.log('GET REQUEST BY ID...');
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

// 4) UPDATE user by ID (PUT /api/users/:id)
router.put('/:id', async (req, res) => {
    // console.log('PUT REQUEST...');
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

// 5) PATCH user by ID (PATCH /api/users/:id)
// Partial object (only changed fields)
router.patch('/:id', async (req, res) => {
    // console.log('PATCH REQUEST...');
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

// 6) DELETE user by ID (DELETE /api/users/:id)
router.delete('/:id', async (req, res) => {
    // console.log('DELETE REQUEST...');
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