import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectorService {
  private coins: string[];
  private dates: string[];
  private selectedCoin: string;
  private selectedDate: string;

  constructor(private httpClient: HttpClient){
    this.coins = ["EUR", "USD", "GBP", "AUD", "CAD", "JPY"];
    this.dates = ["2018-04-27", "2018-07-22", "2018-09-10", "2018-06-20", "2018-02-11", "2018-02-01"];
    this.selectedDate = this.dates[0];
    this.selectedCoin = this.coins[0];
  }

  getResultsFromAPI(selectedDate, selectedCoin): any {
    let apiObservable: any = this.httpClient
      .get<JSON>(`https://api.exchangeratesapi.io/${selectedDate}?base=${selectedCoin}`);
    apiObservable.subscribe(
      (data) => {
        var test = this.getRates(data.rates);
        let coinsToShow = test[1];
        let buy = test[0].map(function (x) { return x * 0.95; });
        let sell = test[0].map(function (x) { return x * 1.05; });
        return [coinsToShow, buy, sell];
      }
    );

  }

  getRates(data: object): any {
    let selectedRates: number[] = new Array(5);
    let selectedCoins: string[] = new Array(5);
    let num = 0;

    for (let nums in this.coins) {
      if (data[this.coins[nums]] != undefined) {
        selectedCoins[num] = this.coins[nums];
        selectedRates[num++] = data[this.coins[nums]];
      }
    }

    return [selectedRates, selectedCoins];
  }
}
