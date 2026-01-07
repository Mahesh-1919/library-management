import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.model.js";
import { encryptToken } from "../../utils/jwtEncrypt.js";

export default {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error("Unauthorized");
      return await User.findById(user.id).select("-password");
    }
  },

  Mutation: {
    register: async (_, args) => {
      const exists = await User.findOne({ email: args.email });
      if (exists) throw new Error("Email already exists");

      const hashed = await bcrypt.hash(args.password, 10);
      const user = await User.create({
        ...args,
        password: hashed
      });

      return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("Invalid credentials");

      const match = await bcrypt.compare(password, user.password);
      if (!match) throw new Error("Invalid credentials");

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return {
        token: encryptToken(token),
        user
      };
    }
  }
};
