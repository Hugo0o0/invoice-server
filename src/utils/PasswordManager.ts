import bcrypt from "bcrypt";
import AppError from "./AppError";

class PasswordManager {
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async comparePassword(password: string, hashedPassword: string) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) throw new AppError("Email or password is incorrect", 400);
  }
}

export default PasswordManager;
