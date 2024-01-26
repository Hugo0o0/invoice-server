import user from "@/prisma-client/UserClient";
import TokenProcessor from "@/utils/TokenProcessor";
import { StatusCodes } from "@/utils/constants";
import tryCatch from "@/utils/tryCatch";
import { User } from "@prisma/client";

const { generateToken } = new TokenProcessor();

const getUserControllerJsonData = (user: User, token: string) => {
  return {
    status: "success",
    data: {
      email: user.email,
      name: user.name,
      token: {
        jwt: token,
      },
    },
  };
};

const generateUserToken = (user: User) => {
  return generateToken({
    id: user.id,
    email: user.email,
    name: user.name,
  });
};

export const signup = tryCatch(async (req, res, _) => {
  const newUser = await user.signup(req.body.user);
  const token = generateUserToken(newUser);
  const userControllerJsonData = getUserControllerJsonData(newUser, token);

  res.status(StatusCodes.CREATED).json(userControllerJsonData);
});

export const login = tryCatch(async (req, res, _) => {
  const { email = "", password = "" } = req.body.user;
  const userLogin = await user.login(email, password);
  const token = generateUserToken(userLogin);

  const userControllerJsonData = getUserControllerJsonData(userLogin, token);

  res.status(StatusCodes.OK).json(userControllerJsonData);
});
