
function makeJWTTokenValidator({ jwt, jwtSecret = process.env.JWT_SECRET, }) {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        console.log("authheader=",authHeader)
        try {
            const token = authHeader.split(' ')[1];
            if (token) {
                const authenticatedUser = jwt.decode(token, jwtSecret);
                req.authUser = authenticatedUser;
                return next();
            }
            return res.sendStatus(401);
        } catch (err) {
            return res.sendStatus(403);
        }
    };
}

const generateJWTToken = ({ jwt, jwtSecret }) => {
    return (payload) => {
        const token = jwt.encode(payload, jwtSecret);
        return token;
    }
};

module.exports = { makeJWTTokenValidator, generateJWTToken };
