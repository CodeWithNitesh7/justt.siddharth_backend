const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    
    // const token = req.cookie.token;
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Token not found",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // user optional data 
    req.user = decoded;

    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied - Admin only",
      });
    }

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token",
    });
  }
};