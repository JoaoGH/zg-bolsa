import { Component } from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

export interface PeriodicElement {
  simbol: string;
  data: string;
  quantidade: number;
  saldo: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {data: '01/01/2019', simbol: 'ITUB4F', quantidade: 1, saldo: 123.12},
  {data: '02/01/2019', simbol: 'ITUB4F', quantidade: 4, saldo: 123.12},
  {data: '03/01/2019', simbol: 'ITUB4F', quantidade: 6, saldo: 123.12},
  {data: '04/01/2019', simbol: 'ITUB4F', quantidade: 9, saldo: 123.12},
  {data: '05/01/2019', simbol: 'ITUB4F', quantidade: 10, saldo: 123.12},
  {data: '06/01/2019', simbol: 'ITUB4F', quantidade: 12, saldo: 123.12},
  {data: '07/01/2019', simbol: 'ITUB4F', quantidade: 14, saldo: 123.12},
  {data: '08/01/2019', simbol: 'ITUB4F', quantidade: 15, saldo: 123.12},
  {data: '09/01/2019', simbol: 'ITUB4F', quantidade: 18, saldo: 123.12},
  {data: '10/01/2019', simbol: 'ITUB4F', quantidade: 20, saldo: 123.12},
];

@Component({
  selector: 'app-acao-dia',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIcon],
  templateUrl: './acao-dia.component.html',
  styleUrl: './acao-dia.component.scss'
})
export class AcaoDiaComponent {
  displayedColumns: string[] = ['data', 'simbol', 'quantidade', 'saldo', 'grafico'];
  dataSource = ELEMENT_DATA;

}
