import crypto from "crypto";

const algorithm = "aes-256-cbc";

const getKey = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return crypto
    .createHash("sha256")
    .update(process.env.JWT_SECRET, "utf8")
    .digest()
    .slice(0, 32);
};

export const encryptToken = (token) => {
  const iv = crypto.randomBytes(16);
  const key = getKey();

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(token, "utf8", "hex");
  encrypted += cipher.final("hex");

  return `${iv.toString("hex")}:${encrypted}`;
};

export const decryptToken = (encryptedToken) => {
  const [ivHex, encrypted] = encryptedToken.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const key = getKey();

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};
