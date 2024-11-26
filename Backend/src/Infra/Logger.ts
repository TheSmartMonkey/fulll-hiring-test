/* eslint-disable no-console */

export class Logger {
  static info(message: string): void {
    console.log(message);
  }

  static error(message: string, error: Error): void {
    console.error(message, error);
  }
}
