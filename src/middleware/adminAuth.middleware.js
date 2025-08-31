export const adminAuthMiddleware = (req, res, next) => {
    const token = "123456"
    const isAdminAuthenticated = token === "123456"; // Example check
    if (!isAdminAuthenticated) {
        return res.status(403).send("Forbidden: Admins only");
    } else {
        next();
    }
}