const jwt = require('jsonwebtoken');

// Verify the token
function verifyToken (req,res,next) {
    const token = req.headers.token;
    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({message: "Invalid token"})
        }
    }
    else {
        res.status(401).json({message: "No token provided"})
    }
}

// Verify  Token & authorize the user
function verifyTokenAndAuthorization(req,res,next) {
    verifyToken(req,res,()=>{
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({message: "You are not authorized to update this user"})
        }
    })
}

// Verify  Token & admin
function verifyTokenAndAdmin(req,res,next) {
    verifyToken(req,res,()=>{
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({message: "You are not authorized to update this user, you are not an admin"})
        }
    })
}

module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin}