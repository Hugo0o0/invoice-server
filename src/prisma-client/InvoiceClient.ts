import { PrismaClient } from "@prisma/client";
import prisma from "./prisma-client";
import InvoiceCreateInput, {
  InvoiceCreateInputType,
  InvoiceUpdateInput,
} from "@/utils/zod/invoice";

class InvoiceClient {
  constructor(private readonly invoice: PrismaClient["invoice"]) {}

  public async createInvoice(data: InvoiceCreateInputType, userId: number) {
    InvoiceCreateInput.parse(data);
  }

  public async getInvoices(userId: string) {
    return await this.invoice.findMany({
      where: { userId },
      include: {
        clientAddress: true,
        senderAddress: true,
        items: true,
      },
    });
  }

  public async getInvoice(id: string) {
    return await this.invoice.findUnique({
      where: { id },
      include: {
        clientAddress: true,
        senderAddress: true,
        items: true,
      },
    });
  }

  async getInvoiceWithUser(id: string) {
    return await this.invoice.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  public async updateInvoice(data: InvoiceCreateInputType, id: string) {
    InvoiceUpdateInput.parse(data);
  }

  public async deleteInvoice(id: string) {
    return await this.invoice.delete({
      where: { id },
    });
  }
}

const invoice = new InvoiceClient(prisma.invoice);

export default invoice;
