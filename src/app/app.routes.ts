import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'invoices', pathMatch: 'full' },

  {
    path: 'invoices',
    loadComponent: () =>
      import('./components/invoice-list/invoice-list.component').then(
        (m) => m.InvoiceListComponent
      ),
    children: [
      {
        path: 'new',
        outlet: 'modal',
        loadComponent: () =>
          import('./components/invoice-form/invoice-form.component').then(
            (m) => m.InvoiceFormComponent
          ),
      },
      {
        path: ':id/edit',
        outlet: 'modal',
        loadComponent: () =>
          import('./components/invoice-form/invoice-form.component').then(
            (m) => m.InvoiceFormComponent
          ),
      },
    ],
  },

  {
    path: 'invoices/:id',
    loadComponent: () =>
      import('./components/invoice-details/invoice-details.component').then(
        (m) => m.InvoiceDetailsComponent
      ),
  },
];
