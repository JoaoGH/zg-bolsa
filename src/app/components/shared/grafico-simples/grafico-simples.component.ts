import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {AcaoService} from "../../../services/acao.service";

export interface Dados {
  acao: string,
  data: string
}

@Component({
  selector: 'app-grafico-simples',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CommonModule,
    RouterOutlet,
    CanvasJSAngularChartsModule
  ],
  templateUrl: './grafico-simples.component.html',
  styleUrl: './grafico-simples.component.scss'
})
export class GraficoSimplesComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Dados,
    private acaoService: AcaoService
  ) {}

  chartOptions: object = {}
  dataPoints: object[] = []
  notFound: string = ''

  ngOnInit(): void {

    this.acaoService.obterAcaoByDia(this.data.acao, this.data.data).then((value: any) => {
      if (!value.success) {
        this.notFound = `Não foi encontrado nenhum registro para ${this.data.acao} na data de ${this.data.data}.`
        return
      } else {
        let temCompra = false;
        let temVenda = false;
        for (let it of value.data.acoes) {
          if (it.operacao === 'C') {
            temCompra = true;
          }
          if (it.operacao === 'V') {
            temVenda = true;
          }
          let obj = {
            label: it.operacao === 'C' ? 'Compra' : 'Venda',
            y: it.preco
          }
          this.dataPoints.push(obj);
        }

        if (!temCompra) {
          this.dataPoints.push({
            label: 'Compra',
            y: 0
          })
        }
        if (!temVenda) {
          this.dataPoints.push({
            label: 'Venda',
            y: 0
          })
        }
      }

      this.chartOptions = {
        title: {
          text: `${this.data.acao} em ${this.data.data}`
        },
        data: [{
          type: "column",
          dataPoints: this.dataPoints
        }]
      };
    });

  }

}
