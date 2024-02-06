import {Component, ViewChild} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatDatepicker,
  MatDatepickerInput, MatDatepickerModule,
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker
} from "@angular/material/datepicker";
import {MatFormField, MatFormFieldModule, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import {MatDialog} from "@angular/material/dialog";
import {JsonPipe, NgClass} from "@angular/common";
import {AcaoService} from "../../services/acao.service";
import {UserTrade} from "../../models/UserTrade";
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIcon} from "@angular/material/icon";
import {GraficoSimplesComponent} from "../shared/grafico-simples/grafico-simples.component";

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-acoes-periodo',
  standalone: true,
  imports: [
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    MatDateRangeInput,
    MatDateRangePicker,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    JsonPipe,
    NgClass,
    MatIconButton,
    MatIcon
  ],
  providers: [
    provideMomentDateAdapter(MY_FORMATS),
  ],
  templateUrl: './acoes-periodo.component.html',
  styleUrl: './acoes-periodo.component.scss'
})
export class AcoesPeriodoComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['simbol', 'data', 'operacao', 'rendimento', 'grafico']
  dataSource!: MatTableDataSource<UserTrade>;
  isActiveNOofCasesNo: boolean = false;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(
    public dialog: MatDialog,
    private acaoService: AcaoService
  ) {}

  buscarRegistros(): void {
    let dataInicial = moment(this.range.value.start).format('DD/MM/yyyy');
    let dataFinal = moment(this.range.value.end).format('DD/MM/yyyy');
    this.acaoService.obterPeriodo(dataInicial, dataFinal).then((value: any) => {
      this.dataSource = new MatTableDataSource(value.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isActiveNOofCasesNo = true;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  verGrafico(element: UserTrade): void {
    this.dialog.open(GraficoSimplesComponent, {
      data: { acao: element.simbol, data: moment(element.data, 'YYYY-MM-DD').format('DD/MM/yyyy') },
    });
  }

  protected readonly moment = moment;
}
