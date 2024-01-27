export enum StatusCodes {
  OK = 200,
  BAD_REQUEST = 400,
  INTERNAL_SERVER = 500,
  CREATED = 201,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  DELETE = 204,
}

export enum ItemErrorMessages {
  INVALID_NAME = "Invalid name",
  INVALID_QUANTITY = "Invalid quantity",
  INVALID_PRICE = "Invalid price",
  INVALID_TOTAL = "Invalid total",
  NAME_REQUIRED = "Name is required",
  QUANTITY_REQUIRED = "Quantity is required",
  PRICE_REQUIRED = "Price is required",
  TOTAL_REQUIRED = "Total is required",
}

export enum AdressErrorMessages {
  INVALID_STREET = "Invalid street",
  INVALID_CITY = "Invalid city",
  INVALID_COUNTRY = "Invalid country",
  INVALID_POSTCODE = "Invalid postcode",
  STREET_REQUIRED = "Street is required",
  CITY_REQUIRED = "City is required",
  COUNTRY_REQUIRED = "Country is required",
  POSTCODE_REQUIRED = "Postcode is required",
  INVALID_LENGTH = "Length must be less than 55 characters",
}

export enum UserErrorMessages {
  INVALID_EMAIL = "Invalid email",
  EMAIL_REQUIRED = "Email is required",
  NAME_REQUIRED = "Name is required",
  INVALID_NAME = "Invalid name",
  MIN_NAME = "Name must be at least 1 character",
  MAX_NAME = "Name must be at least 30 character",
  MAX_PASSWORD = "Password must be at least 30 character",
  MIN_PASSWORD = "Password must be at least 8 character",
  INVALID_PASSWORD = "Invalid password",
  PASSWORD_REQUIRED = "Password is required",
}

export enum InvoiceErrorMessages {
  INVALID_STATUS = "Invalid status",
  STATUS_REQUIRED = "Status is required",
  DESCRIPTION_REQUIRED = "Description is required",
  DESCRIPTION_TOO_LONG = "Description must be less than 255 characters",
  INVALID_DESCRIPTION = "Description must be a string",
  INVALID_CLIENT_NAME = "Invalid client name",
  CLIENT_NAME_REQUIRED = "Client name is required",
  INVALID_CLIENT_EMAIL = "Invalid client email",
  CLIENT_EMAIL_REQUIRED = "Client email is required",
  INVALID_PAYMENT_DUE = "Invalid payment due",
  PAYMENT_DUE_REQUIRED = "Payment due is required",
  INVALID_PAYMENT_TERMS = "Invalid payment terms",
  PAYMENT_TERMS_REQUIRED = "Payment terms is required",
}
