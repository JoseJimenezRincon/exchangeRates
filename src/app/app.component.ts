import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataTable } from './interfaces/data-table';
import { MockDataService } from './services/mock-data.service';

// Interface of remote api object rates.
interface ExchangeRate {
  base: string,
  date: string,
  rates: object
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private coins: string[];
  private dates: string[];
  private selectedCoin: string;
  private selectedDate: string;
  private selectedRow: number;
  //Represents the values to show in the table
  private coinsToShow: string[];
  private buy: number[];
  private sell: number[];

  // Observable to interact with remote async API
  private apiObservable: Observable<any>;
  // Interface ExchangeRate
  private objExchange: ExchangeRate;
  //Order for sor Coins, 1 asc, -1 desc
  private order: number = 1;
  path: string[] = ['currency'];


  constructor(private httpClient: HttpClient, private mockService: MockDataService) {
    //Initializes the values of default coins and dates.
    this.coins = this.mockService.getCoins();
    this.dates = this.mockService.getDates();
    this.selectedDate = this.dates[0];
    this.selectedCoin = this.coins[0];
  }

  ngOnInit() {
    // Gets the default API values ​​of 2018-04-27 in EUR
    this.showResultsToTable();
  }

  /**
  * Gets rates of selected coins from remote Api
  * @param data Returns selected coins and rates from the user.
  */
  getRates(data: object): any {
    let selectedRates: number[] = new Array(5);
    let selectedCoins: string[] = new Array(5);
    let num = 0;

    for (let nums in this.coins) {
      if (data[this.coins[nums]] != undefined) {
        selectedCoins[num] = this.coins[nums];
        selectedRates[num++] = data[this.coins[nums]];
      }else{

      }
    }

    return [selectedRates, selectedCoins];
  }

  /**
   * Gets values from the api (GET) and shows in the table.
   */
  showResultsToTable() {
    this.apiObservable = this.httpClient
      .get<JSON>(`https://api.exchangeratesapi.io/${this.selectedDate}?base=${this.selectedCoin}`);
    this.apiObservable.subscribe(
      (data) => {
        var test = this.getRates(data.rates);
        this.buy = test[0].map(function (x) { return x * 0.95; });
        this.sell = test[0].map(function (x) { return x * 1.05; });
        this.coinsToShow = test[1];
      }
    );
  }

  /**
   * Update selectedDate by the user
   * @param value 
   */
  updateSelectedDate(value: string) {
    this.selectedDate = value;
  }

  /**
   * Update selectedCoin by the user
   * @param value
   */
  updateSelectedCoin(value: string) {
    this.selectedCoin = value;
  }

  /**
   * Sort table asc and desc
   * @param prop 
   */
  sortTable(prop: string) {
    this.path = prop.split('.')
    this.order = this.order * (-1); // change order
    return false; // do not reload
  }
}
