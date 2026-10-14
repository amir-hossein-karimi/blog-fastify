import jwt, { type JwtPayload } from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET;

if (!ACCESS_TOKEN_SECRET) {
  throw new Error("JWT_ACCESS_SECRET is not configured");
}

if (!REFRESH_TOKEN_SECRET) {
  throw new Error("JWT_REFRESH_SECRET is not configured");
}

export const generateAccessToken = (userId: number): string => {
  return jwt.sign({}, ACCESS_TOKEN_SECRET, {
    subject: userId.toString(),
    expiresIn: "15m",
    algorithm: "HS256",
  });
};

export const verifyAccessToken = (token: string): JwtPayload => {
  const payload = jwt.verify(token, ACCESS_TOKEN_SECRET, {
    algorithms: ["HS256"],
  });

  if (
    typeof payload === "string" ||
    typeof payload.sub !== "string" ||
    !/^[1-9]\d*$/.test(payload.sub)
  ) {
    throw new Error("Invalid access token payload");
  }

  return payload;
};

export const generateRefreshToken = (userId: number): string => {
  return jwt.sign({}, REFRESH_TOKEN_SECRET, {
    subject: userId.toString(),
    expiresIn: "7D",
    algorithm: "HS256",
  });
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  const payload = jwt.verify(token, REFRESH_TOKEN_SECRET, {
    algorithms: ["HS256"],
  });

  if (
    typeof payload === "string" ||
    typeof payload.sub !== "string" ||
    !/^[1-9]\d*$/.test(payload.sub)
  ) {
    throw new Error("Invalid refresh token payload");
  }

  return payload;
};
