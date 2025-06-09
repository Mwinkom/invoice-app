import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InvoiceService, Invoice } from '../../services/invoice.service';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
})
export class InvoiceFormComponent {
  invoiceForm: FormGroup;
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private invoiceService: InvoiceService) {
    this.invoiceForm = this.fb.group({
      clientName: [''],
      clientEmail: [''],
      description: [''],
      createdAt: [''],
      paymentDue: [''],
      senderStreet: [''],
      senderCity: [''],
      senderPostCode: [''],
      senderCountry: [''],
      clientStreet: [''],
      clientCity: [''],
      clientPostCode: [''],
      clientCountry: [''],
    });

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        // TODO: load invoice by ID and patch form
      }
    });
  }

  onSubmit() {
  if (this.invoiceForm.valid) {
    const newInvoice: Invoice = {
      ...this.invoiceForm.value,
      id: this.generateId(),
      status: 'pending',
      total: 0, // calculate if items are added
      items: [],
      senderAddress: {
        street: this.invoiceForm.value.senderStreet,
        city: this.invoiceForm.value.senderCity,
        postCode: this.invoiceForm.value.senderPostCode,
        country: this.invoiceForm.value.senderCountry,
      },
      clientAddress: {
        street: this.invoiceForm.value.clientStreet,
        city: this.invoiceForm.value.clientCity,
        postCode: this.invoiceForm.value.clientPostCode,
        country: this.invoiceForm.value.clientCountry,
      },
    };

      this.invoiceService.addInvoice(newInvoice);
      this.closeForm(); 
    }
  }

generateId(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

  onBackdropClick(event: MouseEvent): void {
    this.router.navigate(['/']);
  }

  closeForm(): void {
    this.router.navigate(['/invoices', { outlets: { modal: null } }]);
  }

}
