import { InvoiceUpdateInputType } from "../zod/invoice";

const updateInvoiceSanitizer = (data: InvoiceUpdateInputType, id: string) => {
  return {
    where: { id },

    data: {
      items: data.items,
      clientAddress: {
        update: data.clientAddress,
      },
      senderAddress: {
        update: data.senderAddress,
      },
      description: data.description,
      paymentTerms: data.paymentTerms,
      status: data.status,
      clientEmail: data.clientEmail,
      clientName: data.clientName,
      paymentDue: data.paymentDue,
      total: data.total,
    },
    include: {
      clientAddress: true,
      senderAddress: true,
    },
  };
};

export default updateInvoiceSanitizer;
