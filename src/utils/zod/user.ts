import { z } from "zod";
import { UserErrorMessages } from "../enums";

const UserCreateInput = z.object({
  email: z
    .string({ required_error: UserErrorMessages.EMAIL_REQUIRED })
    .email({ message: UserErrorMessages.INVALID_EMAIL }),
  name: z
    .string({
      required_error: UserErrorMessages.NAME_REQUIRED,
      invalid_type_error: UserErrorMessages.INVALID_NAME,
    })
    .min(1, { message: UserErrorMessages.MIN_NAME })
    .max(30, {
      message: UserErrorMessages.MAX_NAME,
    }),
  password: z
    .string({
      required_error: UserErrorMessages.PASSWORD_REQUIRED,
      invalid_type_error: UserErrorMessages.INVALID_PASSWORD,
    })
    .min(8, {
      message: UserErrorMessages.MIN_PASSWORD,
    })
    .max(30, { message: UserErrorMessages.MAX_PASSWORD }),
});

export type UserCreateInputType = z.infer<typeof UserCreateInput>;

export default UserCreateInput;
