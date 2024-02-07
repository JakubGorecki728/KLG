import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PreviewInvoiceComponent } from "../components/preview-invoice/preview-invoice.component";
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { routerPath } from './app.routes';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
      RouterOutlet, 
      RouterLink,
      RouterLinkActive,
      PreviewInvoiceComponent, 
      MatSidenavModule, 
      MatButtonModule, 
      MatSelectModule, 
      MatFormFieldModule, 
      MatToolbarModule, 
      MatListModule
    ]
})
export class AppComponent implements OnInit{
  ngOnInit() {
    
  }

  protected contentToolbarTitle: string = 'KLG invoice generator';
  protected drawerToolbarTitle: string = 'Menu';
  protected navItems: { name: string, path: string }[] = [
    {
      name: 'New invoice',
      path: routerPath('new-invoice')
    },
    {
      name: 'Preview invoice',
      path: routerPath('preview')
    }
  ];
}
