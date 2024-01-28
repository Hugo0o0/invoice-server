import { z } from "zod";
import { AdressErrorMessages } from "../enums";

const MAX_LENGTH = 55;

const invalidLengthMessage = {
  message: AdressErrorMessages.INVALID_LENGTH,
};

const AdressCreateInput = z.object({
  street: z
    .string({
      required_error: AdressErrorMessages.STREET_REQUIRED,
      invalid_type_error: AdressErrorMessages.INVALID_STREET,
    })
    .max(MAX_LENGTH, invalidLengthMessage),
  city: z
    .string({
      required_error: AdressErrorMessages.CITY_REQUIRED,
      invalid_type_error: AdressErrorMessages.INVALID_CITY,
    })
    .max(MAX_LENGTH, invalidLengthMessage),
  postCode: z
    .string({
      required_error: AdressErrorMessages.POSTCODE_REQUIRED,
      invalid_type_error: AdressErrorMessages.INVALID_POSTCODE,
    })
    .max(10, { message: AdressErrorMessages.INVALID_POSTCODE }),
  country: z
    .string({
      required_error: AdressErrorMessages.COUNTRY_REQUIRED,
      invalid_type_error: AdressErrorMessages.INVALID_COUNTRY,
    })
    .max(MAX_LENGTH, invalidLengthMessage),
});

export type AdressCreateInputType = z.infer<typeof AdressCreateInput>;

export default AdressCreateInput;
