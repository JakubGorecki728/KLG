import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { CommonModule } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { CompanyData } from '../../app/models/company-data';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Invoice } from '../../app/models/invoice';

@Component({
  selector: 'app-preview-invoice',
  standalone: true,
  imports: [
    CommonModule, 
    MatDivider
  ],
  templateUrl: './preview-invoice.component.html',
  styleUrl: './preview-invoice.component.scss'
})
export class PreviewInvoiceComponent implements OnInit {

  constructor(
    private backendSvc: BackendService,
    public activatedRoute: ActivatedRoute
  ) {}

  invoices: Invoice[] | undefined;
  $companyData: Observable<CompanyData> | undefined;

  ngOnInit() {
    this.$companyData = this.backendSvc.getCompanyData();

    this.invoices = window.history.state.invoices;

  }

}
