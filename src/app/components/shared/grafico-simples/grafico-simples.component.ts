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
import {Renderer2} from "@angular/core";
import {Dados} from "../../../models/Dados";


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
    CanvasJSAngularChartsModule,
  ],
  templateUrl: './grafico-simples.component.html',
  styleUrl: './grafico-simples.component.scss'
})
export class GraficoSimplesComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Dados,
    private acaoService: AcaoService,
    private renderer: Renderer2
  ) {}

  chartOptions: object = {}
  dataPoints: object[] = []
  notFound: string = ''

  ngOnInit(): void {

    this.acaoService.obterAcaoByDia(this.data.acao, this.data.data).then((value: any) => {
      if (!value.success) {
        this.notFound = `Não foi encontrado nenhum registro para ${this.data.acao} na data de ${this.data.data}.`
        const d = document.getElementById('dados');
        this.renderer.setStyle(d, 'display', 'none');
        return
      } else {
        const d = document.getElementById('aviso');
        this.renderer.setStyle(d, 'display', 'none');
        let isLong = false;
        const userTrade = value.data.acoes[0];
        const mercadoTrade = value.data.mercado[0];

        if (userTrade.operacao === 'C') {
          isLong = true;
        }

        const operacao = {
          label: isLong ? 'Compra' : 'Venda',
          y: userTrade.preco
        }

        this.dataPoints.push(operacao);

        const mercado = {
          label: 'Preço de Mercado',
          y: mercadoTrade.preco
        }

        this.dataPoints.push(mercado);
      }

      this.chartOptions = {
        title: {
          text: `${this.data.acao} em ${this.data.data}`
        },
        axisY: {
          includeZero: true,
          prefix: "R$ "
        },
        data: [{
          type: "column",
          yValueFormatString: "R$ #,###.00",
          dataPoints: this.dataPoints
        }]
      };
    });

  }

}
