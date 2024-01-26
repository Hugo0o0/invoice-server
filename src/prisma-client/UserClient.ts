import { PrismaClient } from "@prisma/client";
import prisma from "./prisma-client";
import UserCreateInput, { UserCreateInputType } from "@/utils/zod/user";
import AppError from "@/utils/AppError";
import PasswordManager from "@/utils/PasswordManager";

const { comparePassword, hashPassword } = new PasswordManager();

class User {
  constructor(private readonly prismaUser: PrismaClient["user"]) {}

  async signup(data: UserCreateInputType) {
    UserCreateInput.parse(data);

    const userExist = await this.checkUserExist(data.email);
    if (userExist) throw new AppError("Email is taken", 400);

    const user = await this.createUserAndReturn(data);

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.checkUserExist(email);
    if (!user) throw new AppError("Email or password is incorrect", 400);

    await comparePassword(password, user.password);

    return user;
  }

  private async createUserAndReturn(data: UserCreateInputType) {
    return await this.prismaUser.create({
      data: {
        email: data.email,
        name: data.name,
        password: await hashPassword(data.password),
      },
    });
  }

  private async checkUserExist(email: string) {
    return await this.prismaUser.findUnique({
      where: { email },
    });
  }
}

const user = new User(prisma.user);

export default user;
