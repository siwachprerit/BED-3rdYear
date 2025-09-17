const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your-secret-key-for-lec23'; // Use a different secret key for this project

const isLogin = (req, res, next) => {
    // The token is expected to be in the Authorization header, formatted as "Bearer <token>"
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: "Authentication failed: No token provided or incorrect format."
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY);
        // Attach the userId from the token's payload to the request object
        req.userId = decoded.userId;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Authentication failed: Invalid token."
        });
    }
};

module.exports = isLogin;
