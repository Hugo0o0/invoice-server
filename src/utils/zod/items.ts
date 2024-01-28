import { z } from "zod";
import { ItemErrorMessages } from "../enums";

const ItemCreateInput = z.object({
  name: z.string({
    invalid_type_error: ItemErrorMessages.INVALID_NAME,
    required_error: ItemErrorMessages.NAME_REQUIRED,
  }),
  quantity: z
    .number({
      invalid_type_error: ItemErrorMessages.INVALID_QUANTITY,
      required_error: ItemErrorMessages.QUANTITY_REQUIRED,
    })
    .int({
      message: ItemErrorMessages.INVALID_QUANTITY,
    })
    .min(0, {
      message: ItemErrorMessages.INVALID_QUANTITY,
    }),
  price: z
    .number({
      invalid_type_error: ItemErrorMessages.INVALID_PRICE,
      required_error: ItemErrorMessages.PRICE_REQUIRED,
    })
    .int({
      message: ItemErrorMessages.INVALID_PRICE,
    })
    .min(0, {
      message: ItemErrorMessages.INVALID_PRICE,
    }),
  total: z
    .number({
      invalid_type_error: ItemErrorMessages.INVALID_TOTAL,
      required_error: ItemErrorMessages.TOTAL_REQUIRED,
    })
    .int({
      message: ItemErrorMessages.INVALID_TOTAL,
    })
    .min(0, {
      message: ItemErrorMessages.INVALID_TOTAL,
    }),
});

export type ItemCreateInputType = z.infer<typeof ItemCreateInput>;

export default ItemCreateInput;
