import { z } from "zod";

const INVALID_EMAIL = "Invalid email";
const EMAIL_REQUIRED = "Email is required";

const NAME_REQUIRED = "Name is required";
const INVALID_NAME = "Invalid name";

const MIN_NAME = "Name must be at least 1 character";
const MAX_NAME = "Name must be at least 30 character";

const MAX_PASSWORD = "Password must be at least 30 character";
const MIN_PASSWORD = "Password must be at least 8 character";
const INVALID_PASSWORD = "Invalid password";
const PASSWORD_REQUIRED = "Password is required";

const UserCreateInput = z.object({
  email: z
    .string({ required_error: EMAIL_REQUIRED })
    .email({ message: INVALID_EMAIL }),
  name: z
    .string({
      required_error: NAME_REQUIRED,
      invalid_type_error: INVALID_NAME,
    })
    .min(1, { message: MIN_NAME })
    .max(30, {
      message: MAX_NAME,
    }),
  password: z
    .string({
      required_error: PASSWORD_REQUIRED,
      invalid_type_error: INVALID_PASSWORD,
    })
    .min(8, {
      message: MIN_PASSWORD,
    })
    .max(30, { message: MAX_PASSWORD }),
});

export type UserCreateInputType = z.infer<typeof UserCreateInput>;

export default UserCreateInput;
