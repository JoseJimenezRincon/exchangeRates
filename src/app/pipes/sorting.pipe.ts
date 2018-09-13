import { DataTable } from '../interfaces/data-table';
import { Pipe, PipeTransform } from '@angular/core';
import { query } from '@angular/core/src/render3/query';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(dataTables: DataTable[], path: string[], order: number): DataTable[] {

    // Check if is not null
    if (!dataTables || !path || !order) return dataTables;


    return dataTables.sort((a: DataTable, b: DataTable) => {
      // We go for each property followed by path
      path.forEach(property => {
        a = a[property];
        b = b[property];
      })

      // Order * (-1): We change our order
      return a > b ? order : order * (- 1);
    })
  }
}
