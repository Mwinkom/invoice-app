import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-invoice-form',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
})
export class InvoiceFormComponent {
  invoiceForm: FormGroup;
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
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
        // Later: load invoice by ID and patch form
      }
    });
  }

  onSubmit() {
    if (this.invoiceForm.valid) {
      console.log('Form Submitted:', this.invoiceForm.value);
    }
  }
}
