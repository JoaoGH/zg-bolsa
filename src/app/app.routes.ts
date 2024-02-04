import { Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { AcaoDiaComponent } from "./components/acao-dia/acao-dia.component";
import { AcoesDataComponent } from "./components/acoes-data/acoes-data.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'acao-dia', component: AcaoDiaComponent },
  { path: 'acoes-data', component: AcoesDataComponent },
  { path: '**', component: PageNotFoundComponent },
];
