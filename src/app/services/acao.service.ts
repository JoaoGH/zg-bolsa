import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Acao} from "../models/Acao";

@Injectable({
  providedIn: 'root'
})
export class AcaoService {

  obterAcoes(): Observable<Acao[]> {
    const acoes: Acao[] = [
      { simbol: 'MGLU3F' },
      { simbol: 'ITUB4F' },
      { simbol: 'BOVA11' },
      { simbol: 'VVAR3F' },
      { simbol: 'BPAN4F' },
    ];

    return of(acoes);
  }
}
