import { HttpClient } from '@angular/common/http';
import { DataTable } from './../interfaces/data-table';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor() { } 

  getCoins(): string[] {
    return ["EUR", "USD", "GBP", "AUD", "CAD", "JPY"];
  }

  getDates(): string[] {
    return ["2018-04-27", "2018-07-22", "2018-09-10", "2018-06-20", "2018-02-11", "2018-02-01"];
  }
}