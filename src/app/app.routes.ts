import { Routes } from '@angular/router';
import { NewInvoiceComponent } from '../components/new-invoice/new-invoice.component';
import { PreviewInvoiceComponent } from '../components/preview-invoice/preview-invoice.component';

export const routes = [
    { path: 'new-invoice', component: NewInvoiceComponent },
    { path: 'preview', component: PreviewInvoiceComponent },
    { path: '',   redirectTo: '/new-invoice', pathMatch: 'full' },
    { path: '**',   redirectTo: '/new-invoice' },
] as const satisfies Routes;

type RouterPaths = Exclude<typeof routes[number]['path'], '**'>;

export const routerPath = (path: RouterPaths) => path;