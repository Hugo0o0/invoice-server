import { $Enums, PrismaClient } from "@prisma/client";
import prisma from "./prisma-client";
import InvoiceCreateInput, {
  InvoiceCreateInputType,
  InvoiceUpdateInput,
  InvoiceUpdateInputType,
} from "@/utils/zod/invoice";
import createInvoiceSanitizer from "@/utils/sanitizers/createInvoiceSanitizer";
import updateInvoiceSanitizer from "@/utils/sanitizers/updateInvoiceSanitizer";

class InvoiceClient {
  constructor(private readonly invoice: PrismaClient["invoice"]) {}

  public async createInvoice(data: InvoiceCreateInputType, userId: string) {
    InvoiceCreateInput.parse(data);
    return await this.invoice.create(createInvoiceSanitizer(data, userId));
  }

  public async getInvoices(userId: string, query: $Enums.InvoiceStatus[]) {
    return await this.invoice.findMany({
      where: {
        userId,
        status: {
          in: query,
        },
      },
      include: {
        clientAddress: true,
        senderAddress: true,
      },
    });
  }

  public async getInvoice(id: string) {
    const invoiceData = await this.invoice.findUnique({
      where: { id },
      include: {
        clientAddress: true,
        senderAddress: true,
      },
    });
    //@ts-ignore
    delete invoiceData.userId;
    //@ts-ignore
    delete invoiceData.updatedAt;
    return invoiceData;
  }

  async getInvoiceWithUser(id: string) {
    return await this.invoice.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  public async updateInvoice(data: InvoiceUpdateInputType, id: string) {
    InvoiceUpdateInput.parse(data);
    return await this.invoice.update(updateInvoiceSanitizer(data, id));
  }

  public async deleteInvoice(id: string) {
    return await this.invoice.delete({
      where: { id },
    });
  }
}

const invoice = new InvoiceClient(prisma.invoice);

export default invoice;
