import jwt from "jsonwebtoken";

class TokenProcessor {
  generateToken(payload: any) {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
  }

  verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!);
  }
}

export default TokenProcessor;
