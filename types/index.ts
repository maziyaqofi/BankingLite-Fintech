export interface Transaction {
  $id: string;
  userId: string;
  title: string;
  type: string;
  amount: number;
  recipient: string;
  note?: string;
  status?: string;
  date: string;
}

export interface BankAccount {
  $id: string;
  userId: string;
  ownerName: string;
  bankName: string;
  accountNumber: string;
  balance: number;
}