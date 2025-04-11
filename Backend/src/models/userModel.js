const db = require('../config/db');

const createUser = (userData) => {
    const { name, email, password } = userData;
    const query = "INSERT INTO users (name,email,password) VALUES (?,?,?)";
    return new Promise((resolve, reject) => {
        db.query(query, [name, email, password], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const findUserByEmail = (email) => {
    const query = "SELECT * FROM users WHERE email = ?";
    return new Promise((resolve, reject) => {
        db.query(query, [email], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const findUserById = (id) => {
    const query = "SELECT * FROM users WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.query(query, [id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const getAllUsers = () => {
    const query = "SELECT * FROM users";
    return new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const updateUserStatus = (id, status) => {
    const query = "UPDATE users SET status = ? WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.query(query, [status, id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

module.exports = {
    createUser,
    findUserByEmail,
    getAllUsers,
    updateUserStatus,
    findUserById,
};
