const users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

//  REGISTER USER
const registerUser = async (req, res) => {
    const { name, email, password, language, mobile } = req.body;

    try {
        const existingUsers = await users.findUserByEmail(email);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await users.createUser({
            name,
            email,
            password: hashedPassword,
            language,
            mobile,
            status: "Inactive",
        });

        const subject = "Account Registered - Pending Activation";
        const html = `
            <h3>Hi ${name},</h3>
            <p>Thank you for registering. Your account is currently pending activation.</p>
            <p>You will receive another email once your account is activated.</p>
            <br><p>Regards,<br/>Team</p>
        `;

        await sendEmail(email, subject, html);

        res.status(201).json({ message: "Registration successful. Activation email sent." });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error during registration." });
    }
};

// LOGIN USER
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Admin login
        if (email === process.env.ADMIN_EMAIL) {
            if (password === process.env.ADMIN_PASSWORD) {
                const token = jwt.sign({ email, userType: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
                return res.status(200).json({
                    message: "Admin login successful",
                    token,
                    user: { email, userType: "admin" }
                });
            } else {
                return res.status(400).json({ message: "Invalid admin credentials" });
            }
        }

        const results = await users.findUserByEmail(email);
        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if (user.status.toLowerCase() !== "active") {
            return res.status(403).json({ message: "Your account is not active. Please wait for approval." });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                userType: "student"
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error during login." });
    }
};

//  GET USERS
const getUsers = async (req, res) => {
    try {
        const results = await users.getAllUsers();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: "Error fetching users" });
    }
};

//  UPDATE USER STATUS
const updateUserStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!['active', 'disabled'].includes(status.toLowerCase())) {
        return res.status(400).json({ message: "Invalid status" });
    }

    try {
        await users.updateUserStatus(id, status);

        if (status.toLowerCase() === "active") {
            const result = await users.findUserById(id);
            if (result.length > 0) {
                const user = result[0];

                const subject = "Account Activated";
                const html = `
                    <h3>Hi ${user.name},</h3>
                    <p>Your account has been activated. You can now log in and access the platform.</p>
                    <br><p>Regards,<br/>Team</p>
                `;
                await sendEmail(user.email, subject, html);
            }
        }

        res.status(200).json({ message: "User status updated" });

    } catch (err) {
        res.status(500).json({ message: "Error updating user status" });
    }
};

const getMe = async (req, res) => {
    try {
        const results = await users.findUserById(req.user.id);
        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = results[0];
        delete user.password;

        res.status(200).json(user);

    } catch (err) {
        console.error("getMe error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    updateUserStatus,
    getMe
};
