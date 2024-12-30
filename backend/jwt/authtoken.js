import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const createTokenandSaveCookies = async (userId, res) => {
  //jwt have one method jwt.sign()
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    httpOnly: true, //xss
    secure: true,
    sameSite: "strict", //csrf protection
  });
  await User.findByIdAndUpdate(userId, { token });
  return token;
};
export default createTokenandSaveCookies;
