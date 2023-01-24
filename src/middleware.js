const jwt = require("jsonwebtoken");

const middleware = async (req, res, next) => {
  const {token} = req.headers;

  if (!token) {
    return res.status(404).send({message: "token not found"});
  }

  try {
    const varify = jwt.verify(token, "HassSecret");
    if (varify.email) {
      req.userEmail = varify.email;
      next();
    } else {
      return res.status(401).send({message: "Invalid token"});
    }
  } catch (e) {
    res.status(404).send({message: "Token not valid login again"});
  }
};
module.exports = middleware;