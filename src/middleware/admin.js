


const admin = async (req, res, next) => {
    if(!req.user.isAdmin) {
        return res.status(403).json({error: "Forbidden. Admin access required."});
    } next();
}

module.exports = admin;
