import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose} from "@angular/material/dialog";
import {Dados} from "../../../models/Dados";
import {AcaoService} from "../../../services/acao.service";
import {CanvasJSAngularChartsModule} from "@canvasjs/angular-charts";
import {Resumo} from "../../../models/Resumo";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-grafico-por-dia',
  standalone: true,
  imports: [
    CanvasJSAngularChartsModule,
    MatButton,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './grafico-por-dia.component.html',
  styleUrl: './grafico-por-dia.component.scss'
})
export class GraficoPorDiaComponent implements OnInit {
  notFound: string = '';
  chartOptions: object = {};
  listCompra: object[] = [];
  listVenda: object[] = [];
  listMercado: object[] = [];
  resumo: Resumo = {
    precoMercado: '',
    precoOperacao: '',
    rendimentoCompra: '',
    rendimentoVenda: '',
    quantidade: 0,
    acao: '',
    saldo: '',
  };

  constructor(
    private acaoService: AcaoService,
    @Inject(MAT_DIALOG_DATA)
    public data: Dados,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.acaoService.obterAcoesPorDia(this.data.data).then((value: any) => {
      if (!value.success) {
        this.notFound = this.acaoService.messages.notFoundInDate.replace('{0}', this.data.data);
        const d = document.getElementById('dados');
        this.renderer.setStyle(d, 'display', 'none');
        return;
      }

      const d = document.getElementById('aviso');
      this.renderer.setStyle(d, 'display', 'none');

      debugger

      for (let i = 0; i < value.data.acoes.length; i++) {
        let acao = value.data.acoes[i];
        let mercado = value.data.mercado[i];

        let objAcao = {
          label: acao.simbol,
          y: acao.preco
        }
        let objExtra = {
          label: acao.simbol,
          y: 0
        }

        if (acao.operacao === 'C') {
          this.listCompra.push(objAcao);
          this.listVenda.push(objExtra);
        } else {
          this.listCompra.push(objExtra);
          this.listVenda.push(objAcao);
        }

        this.listMercado.push({
          label: mercado.simbol,
          y: mercado.preco
        });
      }

      this.chartOptions = {
        animationEnabled: true,
        title:{
          text: `Ações para ${this.data.data}`
        },
        axisY: {
          includeZero: true,
          prefix: "R$ "
        },
        toolTip: {
          shared: true
        },
        legend: {
          cursor: "pointer",
          itemclick: function (e: any) {
            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
              e.dataSeries.visible = false;
            } else {
              e.dataSeries.visible = true;
            }
            e.chart.render();
          }
        },
        data: [{
          type: "column",
          showInLegend: true,
          name: "Preço de Compra",
          yValueFormatString: "R$ ###,##0.00",
          dataPoints: this.listCompra
        }, {
          type: "column",
          showInLegend: true,
          name: "Preço de Venda",
          yValueFormatString: "R$ ###,##0.00",
          dataPoints: this.listVenda
        }, {
          type: "column",
          showInLegend: true,
          name: "Preço de Mercado",
          yValueFormatString: "R$ ###,##0.00",
          dataPoints: this.listMercado
        }]
      };

      this.resumo.rendimentoCompra = parseFloat(value.data.rendimentoCompra).toFixed(2);
      this.resumo.rendimentoVenda = parseFloat(value.data.rendimentoVenda).toFixed(2);
      this.resumo.quantidade = value.data.qtdAcoes;
      this.resumo.saldo = parseFloat(value.data.saldoTotal).toFixed(2);
    });
  }
}
