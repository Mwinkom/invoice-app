import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InvoiceService, Invoice } from '../../services/invoice.service';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';

@Component({
  selector: 'app-invoice-list',
  imports: [CommonModule, RouterModule, StatusBadgeComponent, FormsModule],
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
})
export class InvoiceListComponent {
  invoices: Invoice[] = [];
  selectedStatus: string = '';

  constructor(private invoiceService: InvoiceService) {
    this.invoiceService.getInvoices().subscribe(data => {
      this.invoices = data;
    });
  }

  get filteredInvoices() {
    return this.selectedStatus
      ? this.invoices.filter(i => i.status === this.selectedStatus)
      : this.invoices;
  }
}
