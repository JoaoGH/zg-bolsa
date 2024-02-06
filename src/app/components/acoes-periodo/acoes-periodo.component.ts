import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatDatepicker,
  MatDatepickerInput, MatDatepickerModule,
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker
} from "@angular/material/datepicker";
import {MatFormField, MatFormFieldModule, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import {GraficoPorDiaComponent} from "../shared/grafico-por-dia/grafico-por-dia.component";
import {MatDialog} from "@angular/material/dialog";
import {JsonPipe} from "@angular/common";

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
    MatFormFieldModule, MatDatepickerModule, FormsModule, JsonPipe
  ],
  providers: [
    provideMomentDateAdapter(MY_FORMATS),
  ],
  templateUrl: './acoes-periodo.component.html',
  styleUrl: './acoes-periodo.component.scss'
})
export class AcoesPeriodoComponent {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(
    public dialog: MatDialog
  ) {}

  openDialog(): void {
    let dataInicial = moment(this.range.value.start).format('DD/MM/yyyy');
    let dataFinal = moment(this.range.value.end).format('DD/MM/yyyy');
  }
}
