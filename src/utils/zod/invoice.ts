import { z } from "zod";
import AdressCreateInput from "./address";
import ItemCreateInput, { ItemUpdateInput } from "./items";
import { InvoiceErrorMessages } from "../enums";

const InvoiceCreateInput = z.object({
  status: z
    .enum(["draft", "pending", "paid"], {
      invalid_type_error: InvoiceErrorMessages.INVALID_STATUS,
      required_error: InvoiceErrorMessages.STATUS_REQUIRED,
    })
    .optional(),

  description: z
    .string({
      invalid_type_error: InvoiceErrorMessages.INVALID_DESCRIPTION,
      required_error: InvoiceErrorMessages.DESCRIPTION_REQUIRED,
    })
    .max(255, { message: InvoiceErrorMessages.DESCRIPTION_TOO_LONG }),

  clientName: z
    .string({
      invalid_type_error: InvoiceErrorMessages.INVALID_CLIENT_NAME,
      required_error: InvoiceErrorMessages.CLIENT_NAME_REQUIRED,
    })
    .min(1, {
      message: InvoiceErrorMessages.INVALID_CLIENT_NAME,
    })
    .max(255, {
      message: InvoiceErrorMessages.INVALID_CLIENT_NAME,
    }),
  clientEmail: z
    .string({
      invalid_type_error: InvoiceErrorMessages.INVALID_CLIENT_EMAIL,
      required_error: InvoiceErrorMessages.CLIENT_EMAIL_REQUIRED,
    })
    .email({
      message: InvoiceErrorMessages.INVALID_CLIENT_EMAIL,
    }),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  paymentDue: z
    .string({
      invalid_type_error: InvoiceErrorMessages.INVALID_PAYMENT_DUE,
      required_error: InvoiceErrorMessages.PAYMENT_DUE_REQUIRED,
    })
    .datetime({
      message: InvoiceErrorMessages.INVALID_PAYMENT_DUE,
    }),

  paymentTerms: z
    .number({
      invalid_type_error: InvoiceErrorMessages.INVALID_PAYMENT_TERMS,
      required_error: InvoiceErrorMessages.PAYMENT_TERMS_REQUIRED,
    })
    .int({
      message: InvoiceErrorMessages.INVALID_PAYMENT_TERMS,
    })
    .min(0, {
      message: InvoiceErrorMessages.INVALID_PAYMENT_TERMS,
    }),

  total: z.number({
    invalid_type_error: InvoiceErrorMessages.INVALID_TOTAL,
    required_error: InvoiceErrorMessages.TOTAL_REQUIRED,
  }),

  senderAddress: AdressCreateInput,
  clientAddress: AdressCreateInput,
  items: ItemCreateInput.array().optional(),
});

export const InvoiceUpdateInput = InvoiceCreateInput.partial();
export type InvoiceUpdateInputType = z.infer<typeof InvoiceUpdateInput>;
export type InvoiceCreateInputType = z.infer<typeof InvoiceCreateInput>;

export default InvoiceCreateInput;
