import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ValidationErrorDisplayPipe } from "../../pipes/form-control-error-display.pipe";
import { CustomValidators } from '../../app/utils/custom-validators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Invoice } from '../../app/models/invoice';
import { routerPath } from '../../app/app.routes';

type NewInvoiceForm = FormGroup<{
  items: FormArray<NewInvoiceRow>
}>;

type NewInvoiceRow = FormGroup<{
  name: FormControl<string | null>;
  count: FormControl<string | null>;
  price: FormControl<string | null>;
}>

@Component({
    selector: 'app-new-invoice',
    standalone: true,
    templateUrl: './new-invoice.component.html',
    styleUrl: './new-invoice.component.scss',
    imports: [
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        MatButton,
        MatIconButton,
        MatIconModule,
        ValidationErrorDisplayPipe
    ]
})
export class NewInvoiceComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ){}

  protected form: NewInvoiceForm = this.fb.group({
    items: this.fb.array<NewInvoiceRow>([])
  });

  ngOnInit() {
    this.addRow();
  }

  protected onSubmit() {
    if (!this.getItemsFormArr().controls.length) { 
      this.snackBar.open('Please add items', 'Ok');
      return; 
    }

    if (this.form.invalid) { 
      this.form.markAllAsTouched(); 
      return; 
    }

    const invoices = this.getInvoices();

    this.router.navigate([routerPath('preview')], { state: { invoices } });
  }

  protected addRow() {
    this.getItemsFormArr().push(
      this.fb.group({
        name: this.fb.control('', { 
          validators: [
            Validators.required, 
            Validators.minLength(3), 
            Validators.maxLength(30)
          ] 
        }),
        count: this.fb.control('1', { 
          validators: [
            Validators.required, 
            Validators.min(1), 
            Validators.max(100),
            CustomValidators.isInteger()
          ] 
        }),
        price: this.fb.control('', { 
          validators: [
            Validators.required, 
            Validators.min(1), 
            Validators.max(1000000),
            CustomValidators.isInteger()
          ] 
        })
      })
    )
  }

  protected deleteRow(rowIdx: number) {
    this.getItemsFormArr().removeAt(rowIdx);
  }

  private getInvoices(): Invoice[] {
    return this.getItemsFormArr().value.map(el => ({
      name: el.name ?? '',
      count: parseInt(el.count ?? ''),
      price: parseInt(el.price ?? '')
    }));
  }

  private getItemsFormArr() {
    return this.form.controls.items;
  }

}
