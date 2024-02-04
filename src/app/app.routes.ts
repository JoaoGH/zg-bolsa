import { Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { AcaoDiaComponent } from "./components/acao-dia/acao-dia.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'acao-dia', component: AcaoDiaComponent }
];
