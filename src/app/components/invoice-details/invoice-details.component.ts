import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent, RouterModule],
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss'],
})
export class InvoiceDetailsComponent {
  invoiceId: string = '';
  invoice: any = null;

  private allInvoices = [
  {
      id: 'RT3080',
      clientName: 'Mildred Naab',
      description: 'Website Redesign',
      createdAt: '2025-06-01',
      paymentDue: '2025-06-15',
      total: 375.0,
      status: 'pending',
      clientEmail: 'mildred@example.com',
      senderAddress: {
        street: '19 Union Terrace',
        city: 'Accra',
        postCode: '23321',
        country: 'Ghana',
      },
      clientAddress: {
        street: '84 Marine Drive',
        city: 'Takoradi',
        postCode: '12345',
        country: 'Ghana',
      },
      items: [
        { name: 'Design Work', quantity: 1, price: 375.0, total: 375.0 },
      ],
      },
      {
      id: 'XM9141',
      clientName: 'Ella Aye',
      description: 'Logo Design',
      createdAt: '2025-05-28',
      paymentDue: '2025-06-10',
      total: 2250.0,
      status: 'paid',
      clientEmail: 'ella@example.com',
      senderAddress: {
        street: '19 Union Terrace',
        city: 'Accra',
        postCode: '23321',
        country: 'Ghana',
      },
      clientAddress: {
        street: '12 Sea View',
        city: 'Cape Coast',
        postCode: '99887',
        country: 'Ghana',
      },
      items: [
        { name: 'Logo Sketching', quantity: 2, price: 750.0, total: 1500.0 },
        { name: 'Final Design', quantity: 1, price: 750.0, total: 750.0 },
      ],
    }
  ];


  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.invoiceId = params['id'];
      this.invoice = this.allInvoices.find((inv) => inv.id === this.invoiceId);
    });
  }
}
