export interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
  total: number; // quantity * price
}

export interface Invoice {
  id: string;
  createdAt: string;          // Invoice creation date
  paymentDue: string;         // Due date
  description: string;
  paymentTerms: number;       // e.g., 30 for Net 30
  clientName: string;
  clientEmail: string;
  status: 'draft' | 'pending' | 'paid';
  senderAddress: Address;
  clientAddress: Address;
  items: InvoiceItem[];
  total: number;
}
