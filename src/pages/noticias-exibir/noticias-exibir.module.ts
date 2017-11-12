import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticiasExibirPage } from './noticias-exibir';

@NgModule({
  declarations: [
    NoticiasExibirPage,
  ],
  imports: [
    IonicPageModule.forChild(NoticiasExibirPage),
  ],
})
export class NoticiasExibirPageModule {}
