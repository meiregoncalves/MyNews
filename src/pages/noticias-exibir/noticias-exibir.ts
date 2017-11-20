import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Noticia } from  '../../models/noticia'
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

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
  trustedUrl : SafeResourceUrl;
  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer) {
    console.log("entoru no exibir");
    this.item = this.navParams.get("item")
    this.trustedUrl = sanitizer.bypassSecurityTrustResourceUrl(this.item.url);
    console.log(this.trustedUrl);
  }

  ionViewDidLoad() {

  }

}
