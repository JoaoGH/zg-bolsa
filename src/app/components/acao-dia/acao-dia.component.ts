import {Component, OnInit} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {Acao} from "../../models/Acao";
import {AcaoService} from "../../services/acao.service";
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
//

import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
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
  selector: 'app-acao-dia',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIcon,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideMomentDateAdapter(MY_FORMATS),
  ],
  templateUrl: './acao-dia.component.html',
  styleUrl: './acao-dia.component.scss'
})
export class AcaoDiaComponent implements OnInit {
  acoes: Acao[] = [];
  selectedAcao: string = '';
  events: string[] = [];
  date = new FormControl(moment());

  constructor(private acaoService: AcaoService) { }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    const dataSelecionada = moment(event.value).format('DD/MM/yyyy')
    console.log(dataSelecionada);
    this.events.push(`${type}: ${event.value}`);
  }

  ngOnInit(): void {
    this.acaoService.obterAcoes().then((data: Acao[]) => {
      this.acoes = data;
      if (data) {
        this.selectedAcao = data[0].simbol
      }
    });
  }

}
