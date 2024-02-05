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
  ],
  templateUrl: './acao-dia.component.html',
  styleUrl: './acao-dia.component.scss'
})
export class AcaoDiaComponent implements OnInit {
  acoes: Acao[] = [];
  selectedAcao: string = '';

  constructor(private acaoService: AcaoService) { }

  ngOnInit(): void {
    this.acaoService.obterAcoes().then((data: Acao[]) => {
      this.acoes = data;
    });
  }

}
