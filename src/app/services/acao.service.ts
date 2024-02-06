import { Injectable } from '@angular/core';
import { Acao } from "../models/Acao";
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;

@Injectable({
  providedIn: 'root'
})
export class AcaoService {

  private apiUrl: string = 'http://localhost:8080/bolsa-api';
  public messages = {
    notFoundInDate: 'Não foi encontrado nenhum registro na data de {0}.',
    notFoundInDateAndCode: 'Não foi encontrado nenhum registro para {0} na data de {1}.',
  }

  async obterAcoes(): Promise<Acao[]> {
    const data = await fetch(`${this.apiUrl}/v1/carteira/listAllSimbols`);
    const value = await data.json() ?? {};
    let content: Acao[] = [];

    if (value) {
      for (let element of value.data) {
        content.push({simbol: element})
      }
    }

    return content;
  }

  async obterAcaoByDia(simbol: string, data: string): Promise<any> {
    const dados = await fetch(`${this.apiUrl}/v1/carteira?` + new URLSearchParams({
      data: moment(data, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      acao: simbol.toUpperCase()
    }));
    const value = await dados.json() ?? {};

    return value;
  }

  async obterAcoesPorDia(data: string): Promise<any> {
    const dados = await fetch(`${this.apiUrl}/v1/carteira/rendimentosPorData?` + new URLSearchParams({
      data: moment(data, 'DD/MM/YYYY').format('YYYY-MM-DD'),
    }));
    const value = await dados.json() ?? {};

    return value
  }

}
