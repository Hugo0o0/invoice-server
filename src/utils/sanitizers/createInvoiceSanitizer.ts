import { InvoiceCreateInputType } from "../zod/invoice";

const createInvoiceSanitizer = (
  data: InvoiceCreateInputType,
  userId: string
) => {
  return {
    data: {
      items: data?.items || [],
      clientAddress: {
        create: data.clientAddress,
      },
      senderAddress: {
        create: data.senderAddress,
      },
      description: data.description,
      paymentTerms: data.paymentTerms,
      status: data.status,
      clientEmail: data.clientEmail,
      clientName: data.clientName,
      paymentDue: data.paymentDue,
      total: data.total,
      userId,
    },
    include: {
      clientAddress: true,
      senderAddress: true,
    },
  };
};

export default createInvoiceSanitizer;
