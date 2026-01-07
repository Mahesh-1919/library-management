import jwt from "jsonwebtoken";
import { decryptToken } from "../utils/jwtEncrypt.js";

const context = ({ req }) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return {};

    const encryptedToken = authHeader.split(" ")[1];
    const decrypted = decryptToken(encryptedToken);
    const user = jwt.verify(decrypted, process.env.JWT_SECRET);

    return { user };
  } catch {
    return {};
  }
};

export default context;
