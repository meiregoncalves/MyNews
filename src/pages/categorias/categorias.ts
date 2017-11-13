import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalStorageService } from 'angular-2-local-storage';
import { Categoria } from '../../models/categoria'
/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {
  items: Categoria[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private localStorageService: LocalStorageService) {
    if (this.localStorageService.get("categorias") != null) {
      this.items = [];
      let array = JSON.parse(<string>this.localStorageService.get("categorias"));
      for (let i = 0; i < array.length; i++) {
          let c = new Categoria(array[i].nome, array[i].selecionado, array[i].id);
          this.items.push(c);
      }
    }

  }

  updateItem(item) {
    for (let i = 0; i < this.items.length; i++) {
      if (item.id == this.items[i].id) {
          if (item.selecionado) {
            this.items[i].selecionado = false;
          } else {
            this.items[i].selecionado = true;
          }
      }
    }
    console.log("item atualizado");
    this.localStorageService.set("categorias", JSON.stringify(this.items));
  }

  itemTapped(event, item) {
    //this.updateItem(item);

    // That's right, we're pushing to ourselves!
    this.navCtrl.push(CategoriasPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriasPage');
  }

}
