import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Noticia } from  '../../models/noticia'

/**
 * Generated class for the NoticiasExibirPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-noticias-exibir',
  templateUrl: 'noticias-exibir.html',
})
export class NoticiasExibirPage {
  item : Noticia;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get("item")
  }

  ionViewDidLoad() {
  }

}
