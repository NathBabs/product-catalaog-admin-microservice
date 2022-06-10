// build a custom error class for the service

/* export class CustomError extends Error {
  statusCode: number;
  constructor(message: string | undefined, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    }
} */

// build a custom error function for the service

class CustomError extends Error {
  statusCode: number;
  constructor(message: string | undefined, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

/* export function customError(message: string | undefined, statusCode: number) {
  return new CustomError(message, statusCode);
} */

// create a customError function that takes in an object with a message and statusCode
export function customError(error: { message: string; statusCode: number }) { 
    return new CustomError(error.message, error.statusCode);
}

export type CustomTypeError = {
    message: string;
    statusCode: number;
};