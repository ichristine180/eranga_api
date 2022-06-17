import jsonwebtoken from "jsonwebtoken";
const config = process.env;

const authenticate = (req, res, next) => {
  const token =
    req.body.authToken || req.query.authToken || req.headers["authToken"];
  if (!token) {
    return res.status(200).json({
        error: true,
        message: "Auth Token is missing!!",
        result: [],
      });
  }
  try {
    const decoded = jsonwebtoken.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(200).json({
        error: true,
        message: "Invalid Token!",
        result: [],
      });
  }
  return next();
};

export default authenticate;
