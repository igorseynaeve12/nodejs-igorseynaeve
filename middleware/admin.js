


function isAdmin(req, res, next) {
    const user = req.user;

    if (user && user.isAdmin) {
        next();
    } else {
        res.status(403).json({ error: "Forbidden. Admin access required." });
    }
}

module.exports = isAdmin;
