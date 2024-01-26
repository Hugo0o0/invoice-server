class AppError extends Error {
  public status: string;
  public isOperational: boolean = true;

  constructor(message: any, public statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
