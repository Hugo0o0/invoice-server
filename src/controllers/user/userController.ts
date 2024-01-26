import user from "@/prisma-client/UserClient";
import tryCatch from "@/utils/tryCatch";

export const signup = tryCatch(async (req, res, _) => {
  const newUser = await user.signup(req.body.user);

  res.status(200).json({
    status: "success",
    data: {
      newUser,
    },
  });
});

export const login = tryCatch(async (req, res, _) => {
  const { email = "", password = "" } = req.body.user;

  const userLogin = await user.login(email, password);

  res.status(200).json({
    status: "success",
    data: {
      userLogin,
    },
  });
});
