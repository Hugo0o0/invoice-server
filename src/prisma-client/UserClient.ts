import { PrismaClient } from "@prisma/client";
import prisma from "./prisma-client";
import UserCreateInput, { UserCreateInputType } from "@/utils/zod/user";
import AppError from "@/utils/AppError";
import AuthenticationService from "@/utils/AuthenticationService";

const { hashPassword, comparePassword } = new AuthenticationService();

class User {
  constructor(private readonly prismaUser: PrismaClient["user"]) {}

  async signup(data: UserCreateInputType) {
    UserCreateInput.parse(data);

    if (await this.isUserExist(data.email))
      throw new AppError("Email is taken", 400);

    const user = await this.prismaUser.create({
      data: {
        email: data.email,
        name: data.name,
        password: await hashPassword(data.password),
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return {
      ...user,
      token: {
        jwt: "",
      },
    };
  }

  async login(email: string, password: string) {
    const user = await this.isUserExist(email);

    if (!user) throw new AppError("Email or password is incorrect", 400);

    if (!(await comparePassword(password, user.password)))
      throw new AppError("Email or password is incorrect", 400);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      token: {
        jwt: "",
      },
    };
  }

  private async isUserExist(email: string) {
    return await this.prismaUser.findUnique({
      where: { email },
      select: {
        email: true,
        id: true,
        name: true,
        password: true,
      },
    });
  }
}

const user = new User(prisma.user);

export default user;
