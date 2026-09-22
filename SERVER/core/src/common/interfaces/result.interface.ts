export interface ResultInterface {
  status: number;
  error: { message: string; status: number };
  message: string;
  body: { id: string };
}
