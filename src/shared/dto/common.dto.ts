export class CommonResponse {
  constructor(success: boolean, message: string) {
    this.success = success;
    this.message = message;
  }

  success: boolean;
  message?: string;
}
