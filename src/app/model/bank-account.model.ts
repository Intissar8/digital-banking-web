export interface BankAccountDTO {
  id: string;
  type: string;
  balance: number;
  createdAt: Date;
  status: string;
  overdraft?: number;
  interestRate?: number;
  customerDTO: {
    id: number;
    name: string;
    email: string;
  };
}
