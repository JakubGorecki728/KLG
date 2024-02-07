import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyData } from '../app/models/company-data';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(
    private http: HttpClient
  ) { }

  getCompanyData() {
    return this.http.get<CompanyData>('assets/company.json');
  }
}
