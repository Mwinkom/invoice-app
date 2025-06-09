import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';
import { InvoiceService, Invoice } from '../../services/invoice.service';
import { StatusLabelPipe } from '../../pipes/status-label.pipe';

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [CommonModule, RouterModule, StatusBadgeComponent, StatusLabelPipe],
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss'],
})
export class InvoiceDetailsComponent {
  invoiceId: string = '';
  invoice: Invoice | undefined = undefined;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService
  ) {
    this.route.params.subscribe((params) => {
      this.invoiceId = params['id'];
      this.invoice = this.invoiceService.getInvoiceById(this.invoiceId);
    });
  }

  markAsPaid() {
    if (!this.invoice) return;
    this.invoiceService.updateInvoice(this.invoice.id, {
      ...this.invoice,
      status: 'paid',
    });
    this.invoice = this.invoiceService.getInvoiceById(this.invoice.id);
  }

  deleteInvoice() {
    if (!this.invoice) return;
    this.invoiceService.deleteInvoice(this.invoice.id);
    this.router.navigate(['/invoices']);
  }

  goBack() {
    this.router.navigate(['/invoices']);
  }

  openEditModal() {
  if (!this.invoice) return;

    this.router.navigate(
      [
        '/invoices',
        {
          outlets: {
            modal: [this.invoice.id, 'edit'],
          },
        },
      ]
    );
  }


}
