import { Injectable } from '@angular/core';
import { Acao } from "../models/Acao";

@Injectable({
  providedIn: 'root'
})
export class AcaoService {

  private apiUrl: string = 'http://localhost:8080/bolsa-api';

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
}
