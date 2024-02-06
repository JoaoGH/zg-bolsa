import {Injectable} from '@angular/core';
import {Acao} from "../models/Acao";
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import {UserTrade} from "../models/UserTrade";

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
  public apiKey: string = 'e712ca24-604f-467a-94ec-0d2bb0f6f153';

  async obterAcoes(): Promise<Acao[]> {
    const data = await fetch(`${this.apiUrl}/v1/carteira/listAllSimbols`, {
      headers: {
        'api-key': this.apiKey
      }
    });
    const value = await data.json() ?? {};
    const content: Acao[] = [];

    if (value) {
      for (const element of value.data) {
        content.push({simbol: element})
      }
    }

    return content;
  }

  async obterAcaoByDia(simbol: string, data: string): Promise<any> {
    const dados = await fetch(`${this.apiUrl}/v1/carteira?` + new URLSearchParams({
      data: moment(data, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      acao: simbol.toUpperCase()
    }), {
      headers: {
        'api-key': this.apiKey
      }
    });
    const value = await dados.json() ?? {};

    return value;
  }

  async obterAcoesPorDia(data: string): Promise<any> {
    const dados = await fetch(`${this.apiUrl}/v1/carteira/rendimentosPorData?` + new URLSearchParams({
      data: moment(data, 'DD/MM/YYYY').format('YYYY-MM-DD'),
    }), {
      headers: {
        'api-key': this.apiKey
      }
    });
    const value = await dados.json() ?? {};

    return value
  }

  async obterPeriodo(dataInicial: string, dataFinal: string): Promise<UserTrade[]> {
    const data = await fetch(`${this.apiUrl}/v1/carteira/listPeriodo?`+ new URLSearchParams({
      dataInicial: moment(dataInicial, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      dataFinal: moment(dataFinal, 'DD/MM/YYYY').format('YYYY-MM-DD'),
    }), {
      headers: {
        'api-key': this.apiKey
      }
    });

    return await data.json() ?? {};
  }

}
