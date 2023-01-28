const jwt = require("jsonwebtoken");
const config = require("../config/jwt.config")


let jwtActions = {};

jwtActions.verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.params.token || req.headers["x-access-token"];

  if (!token) {
    res.status(403).send("Un token es requerido para esta solicitud.");
    return;
  }
  
  try {
    const decoded = jwt.verify(token, config.keys.secret);
    req.user = decoded;
  } catch (err) {
    res.status(401).send("El token es invalido.");
    return; 
  }

  next();
  return;
};

jwtActions.createToken = (id, email) => {
  return jwt.sign(
    { 
      user_id: id, email 
    },
      config.keys.secret,
    {
      expiresIn: "2h",
    }
  );
};

module.exports = jwtActions;