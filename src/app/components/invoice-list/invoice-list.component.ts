import { Component } from '@angular/core';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


type Status = 'paid' | 'pending' | 'draft';

@Component({
  selector: 'app-invoice-list',
  imports: [CommonModule, RouterModule, StatusBadgeComponent, FormsModule],
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
})

export class InvoiceListComponent {
  selectedStatus: string = '';

  get filteredInvoices() {
    return this.selectedStatus
      ? this.invoices.filter(inv => inv.status === this.selectedStatus)
      : this.invoices;
  }

  invoices: {
    id: string;
    clientName: string;
    paymentDue: string;
    total: number;
    status: Status;
  }[] = [
    {
      id: 'RT3080',
      clientName: 'Mildred Naab',
      paymentDue: '2025-06-15',
      total: 375.0,
      status: 'pending',
    },
    {
      id: 'XM9141',
      clientName: 'Ella Aye',
      paymentDue: '2025-06-10',
      total: 2250.0,
      status: 'paid',
    },
  ];
}