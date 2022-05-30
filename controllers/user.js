import bcryptjs from "bcryptjs";
import Users from "../model/user.js";
import jsonwebtoken from "jsonwebtoken";

// creating new user
export const createUser = async (req, res) => {
  try {
    validate(res, req);
    const { first_name, last_name, email, password } = req.body;
    checkIfExit(res, email);
    const encryptedPassword = await bcryptjs.hash(password, 10);
    //inserting user into db
    const user = await Users.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    const token = createToken(user);
    user.token = token;
    res.status(201).json({
      error: false,
      message: "User created successfully",
      result: user,
    });
  } catch (err) {
    console.log(err);
  }
};
const validate = (res, req) => {
  const { first_name, last_name, email, password } = req.body;
  if (!(email && password && first_name && last_name)) {
    res.status(400).json({
      error: true,
      message: "All field are required!!",
      result: [],
    });
  }
};

const createToken = (user) => {
  return jsonwebtoken.sign(
    { user_id: user._id, email: user.email },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );
};

const checkIfExit = async (res, email) => {
  const oldUser = await Users.findOne({ email });
  if (oldUser)
    return res.status(409).json({
      error: true,
      message: "User Already Exist. Please Login",
      result: [],
    });
};

// login

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!(email && password))
      return res.status(400).json({
        error: true,
        message: "both email and password are required!!",
        result: [],
      });
    const user = await Users.findOne({ email });
    // comparing given password against password from database
    if (user && (await bcryptjs.compare(password, user.password))) {
      const token = createToken(user);
      user.token = token;
      res.status(201).json({
        error: false,
        message: "",
        result: user,
      });
    }
    res.status(400).json({
      error: true,
      message: "Invalid credentials",
      result: [],
    });
  } catch (err) {
    console.log(err);
  }
};
