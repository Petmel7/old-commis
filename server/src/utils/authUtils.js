const checkAuthorization = (req) => {
    const userId = req.user ? req.user.id : null;
    if (!userId) {
        throw { status: 401, message: 'Not authorized', type: 'auth_error' };
    }
    return userId;
};

module.exports = { checkAuthorization };