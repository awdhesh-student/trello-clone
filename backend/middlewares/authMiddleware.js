const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader)
      return res.status(401).json({ message: "No token provided." });

    const token = authorizationHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) return res.status(401).json({ message: "Invalid token." });
      else {
        req.body.userId = decoded.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Internal server error: ${error}`,
    });
  }
};
