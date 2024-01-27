import { PrismaClient } from "@prisma/client";
import prisma from "./prisma-client";
import UserCreateInput, { UserCreateInputType } from "@/utils/zod/invoice";

class InvoiceClient {
  constructor(
    private readonly invoice: PrismaClient["invoice"],
    private readonly clientAddress: PrismaClient["clientAddress"],
    private readonly senderAddress: PrismaClient["senderAddress"],
    private readonly items: PrismaClient["item"]
  ) {}

  async createInvoice(data: UserCreateInputType, userId: number) {
    UserCreateInput.parse(data);
    const invoice = await this.invoice.create({
      data: {
        clientEmail: data.clientEmail,
        clientName: data.clientName,
        createdAt: new Date(),
        description: data.description,
        paymentDue: new Date(data.paymentDue),
        paymentTerms: data.paymentTerms,
        status: data.status,
        clientAddress: {
          create: data.clientAddress,
        },
        senderAddress: {
          create: data.senderAddress,
        },

        userId: userId,

        items: {
          create: data.items,
        },
      },
    });

    return invoice;
  }

  async getInvoices(id: number) {
    const invoices = await this.invoice.findMany({
      where: {
        userId: id,
      },
      include: {
        clientAddress: true,
        senderAddress: true,
        items: true,
      },
    });

    return invoices;
  }

  async getInvoice(id: string) {
    return await this.invoice.findUniqueOrThrow({
      where: { id },
      include: {
        clientAddress: true,
        senderAddress: true,
        items: true,
      },
    });
  }

  async getInvoiceWithUser(id: string) {
    return await this.invoice.findUniqueOrThrow({
      where: { id },
      include: {
        clientAddress: true,
        user: true,
        senderAddress: true,
        items: true,
      },
    });
  }

  async updateInvoice(id: string, data: UserCreateInputType) {
    UserCreateInput.parse(data);
    const invoice = await this.invoice.update({
      where: { id },
      data: {
        clientEmail: data.clientEmail,
        clientName: data.clientName,
        createdAt: new Date(),
        description: data.description,
        paymentDue: new Date(data.paymentDue),
        paymentTerms: data.paymentTerms,
        status: data.status,
        clientAddress: {
          update: data.clientAddress,
        },
        senderAddress: {
          update: data.senderAddress,
        },

        //todo add update items
      },
    });

    return invoice;
  }

  async deleteInvoice(id: string) {
    await this.invoice.delete({
      where: { id },
    });

    return;
  }
}

const invoice = new InvoiceClient(
  prisma.invoice,
  prisma.clientAddress,
  prisma.senderAddress,
  prisma.item
);

export default invoice;
