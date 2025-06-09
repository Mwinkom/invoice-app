import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Invoice {
  id: string;
  clientName: string;
  description: string;
  status: 'paid' | 'pending' | 'draft';
  total: number;
  createdAt: string;
  paymentDue: string;
  clientEmail: string;
  senderAddress: Address;
  clientAddress: Address;
  items: InvoiceItem[];
}

interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  private storageKey = 'invoices';

  private invoicesSubject = new BehaviorSubject<Invoice[]>(this.loadFromStorage());
  invoices$ = this.invoicesSubject.asObservable();

  private loadFromStorage(): Invoice[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : this.getDefaultInvoices();
  }

  private saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.invoicesSubject.value));
  }

  getInvoices(): Observable<Invoice[]> {
    return this.invoices$;
  }

  getInvoiceById(id: string): Invoice | undefined {
    return this.invoicesSubject.value.find(i => i.id === id);
  }

  addInvoice(invoice: Invoice) {
    const updated = [...this.invoicesSubject.value, invoice];
    this.invoicesSubject.next(updated);
    this.saveToStorage();
  }

  updateInvoice(id: string, updatedInvoice: Invoice) {
    const updated = this.invoicesSubject.value.map(i =>
      i.id === id ? updatedInvoice : i
    );
    this.invoicesSubject.next(updated);
    this.saveToStorage();
  }

  deleteInvoice(id: string) {
    const updated = this.invoicesSubject.value.filter(i => i.id !== id);
    this.invoicesSubject.next(updated);
    this.saveToStorage();
  }

  private getDefaultInvoices(): Invoice[] {
    return []; 
  }
}
