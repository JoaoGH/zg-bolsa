import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {AcaoService} from "../../../services/acao.service";
import {Renderer2} from "@angular/core";
import {Dados} from "../../../models/Dados";
import {Resumo} from "../../../models/Resumo";

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
  resumo: Resumo = {
    precoMercado: '',
    precoOperacao: '',
    rendimentoCompra: '',
    rendimentoVenda: '',
    quantidade: 0,
    totalAcoesCompradas: 0,
    totalAcoesVendidas: 0,
    acao: '',
    saldo: '',
  };

  ngOnInit(): void {
    this.acaoService.obterAcaoByDia(this.data.acao, this.data.data).then((value: any) => {
      if (!value.success) {
        this.notFound = this.acaoService.messages.notFoundInDateAndCode.replace('{0}', this.data.acao).replace('{1}', this.data.data);
        const d = document.getElementById('dados');
        this.renderer.setStyle(d, 'display', 'none');
        return
      }

      const d = document.getElementById('aviso');
      this.renderer.setStyle(d, 'display', 'none');
      let isLong = false;
      const userTrade = value.data.acoes[0];
      const mercadoTrade = value.data.mercado[0];

      if (userTrade.operacao === 'C') {
        isLong = true;
      }

      const compra = {
        label: 'Compra',
        y: isLong ? userTrade.preco : 0
      }

      const venda = {
        label: 'Venda',
        y: !isLong ? userTrade.preco : 0
      }

      this.dataPoints.push(compra);
      this.dataPoints.push(venda);

      const mercado = {
        label: 'Preço de Mercado',
        y: mercadoTrade.preco
      }

      this.dataPoints.push(mercado);

      this.resumo.precoMercado = parseFloat(mercadoTrade.preco).toFixed(2);
      this.resumo.precoOperacao = parseFloat(userTrade.preco).toFixed(2);
      this.resumo.rendimentoCompra = parseFloat(value.data.rendimentoCompra).toFixed(2);
      this.resumo.rendimentoVenda = parseFloat(value.data.rendimentoVenda).toFixed(2);
      this.resumo.totalAcoesCompradas = value.data.totalAcoesCompradas;
      this.resumo.totalAcoesVendidas = value.data.totalAcoesVendidas;
      this.resumo.quantidade = userTrade.quantidade;
      this.resumo.acao = mercadoTrade.simbol
      this.resumo.saldo = parseFloat(userTrade.saldo).toFixed(2);

      this.chartOptions = {
        title: {
          text: `${this.data.acao} em ${this.data.data}`
        },
        axisY: {
          includeZero: true,
          prefix: "R$ "
        },
        toolTip: {
          shared: true
        },
        data: [{
          type: "column",
          name: `Preço de ${this.data.acao}`,
          yValueFormatString: "R$ #,##0.00",
          dataPoints: this.dataPoints
        }]
      };
    });
  }

}
