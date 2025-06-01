import userLogin from '../models/user.model.js';

export const createUser = async (req, res) => {
    const user = req.body;

    if (!user.username || !user.pwd) {
        return res.status(400).json({ success: false, message: 'Please enter all fields' });
    }
    try {
        const existingUser = await userLogin.findOne({ username: user.username });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'Username already exists' });
        }

        const newUser = new userLogin(user);
        await newUser.save();
        res.status(201).json({ success: true, data: newUser });

    } catch (error) {
        console.error("Error in Create Users:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await userLogin.find({ username: req.params.user1 });
        if (!users) {
            return res.status(404).json({ success: false, message: "No users found" })
        }
        return res.status(200).json({ success: true, data: users })
    } catch (err) {
        console.error("Error in Get users:", err.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
}
