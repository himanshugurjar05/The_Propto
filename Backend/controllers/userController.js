import User from "../models/userModel.js";
import 'dotenv/config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

let userController = {

    // Get All Users
    async getAllUser(req, res) {
        try {
            let allUsers = await User.find();
            res.json(allUsers);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Get User By ID
    async getUserById(req, res) {
        try {
            let oneUser = await User.findById(req.params.id);
            res.json(oneUser);
        } catch (err) {
            res.status(400).json({ message: "Invalid User ID" });
        }
    },

    // Login User
    async loginUser(req, res) {
        try {
            const { email, password, role } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            if (user.role !== role) {
                return res.status(403).json({ message: `Role mismatch. Logged in as ${user.role}` });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '30d' }
            );

            res.json({ token, user });

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Register User
    async createUser(req, res) {
        try {
            const { name, email, password, profilePicture, role } = req.body;

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                profilePicture,
                role
            });

            const savedUser = await newUser.save();

            const token = jwt.sign(
                { id: savedUser._id, role: savedUser.role },
                process.env.JWT_SECRET,
                { expiresIn: '30d' }
            );

            res.json({ token, user: savedUser });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default userController;
