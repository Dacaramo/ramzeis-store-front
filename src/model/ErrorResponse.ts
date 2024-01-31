export interface ErrorResponse {
  name: string;
  message: string;
  statusCode?: number;
  stack?: string;
  issues?: string;
}
