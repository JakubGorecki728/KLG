import { Component, Input } from '@angular/core';
import { Invoice } from '../../app/models/invoice';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-invoices-table',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule
  ],
  templateUrl: './invoices-table.component.html',
  styleUrl: './invoices-table.component.scss'
})
export class InvoicesTableComponent {

  @Input('invoices') invoices: Invoice[] = [];

  protected displayedColumns = ['idx', 'name', 'count', 'price'];

  protected getTotalCost = () => this.invoices.reduce((prev, curr) => curr.price * curr.count + prev, 0);

}
