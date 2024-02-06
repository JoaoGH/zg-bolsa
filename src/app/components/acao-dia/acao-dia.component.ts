import {Component, OnInit} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Acao} from "../../models/Acao";
import {AcaoService} from "../../services/acao.service";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import {MatDialog} from "@angular/material/dialog";
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
  selectedData: string = '';
  date = new FormControl(moment());

  constructor(
    private acaoService: AcaoService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.acaoService.obterAcoes().then((data: Acao[]) => {
      this.acoes = data;
      if (data) {
        this.selectedAcao = data[0].simbol
      }
    });
  }

  openDialog(): void {
    this.selectedData = moment(this.date.value).format('DD/MM/yyyy');
    this.dialog.open(GraficoSimplesComponent, {
      data: {
        acao: this.selectedAcao,
        data: this.selectedData
      },
    });
  }

}
