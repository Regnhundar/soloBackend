const adminAccess = (req, res, next) => {

    if (global.currentUser && global.currentUser.role === "admin") {
        return next();
    }
    const error = new Error("Du måste ha admin-rättigheter för att utföra denna aktion.");
    error.status = 400;
    next(error);
}

export default adminAccess;