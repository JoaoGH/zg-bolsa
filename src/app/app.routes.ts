import { Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { AcaoDiaComponent } from "./components/acao-dia/acao-dia.component";
import { AcoesDataComponent } from "./components/acoes-data/acoes-data.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {AcoesPeriodoComponent} from "./components/acoes-periodo/acoes-periodo.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'acao-dia', component: AcaoDiaComponent },
  { path: 'acoes-data', component: AcoesDataComponent },
  { path: 'acoes-periodo', component: AcoesPeriodoComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
