import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalStorageService } from 'angular-2-local-storage';
import { Categoria } from '../../models/categoria'
import { NoticiasProvider } from '../../providers/database/noticias'
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
  categoria : Categoria;
  constructor(public navCtrl: NavController, public navParams: NavParams, private localStorageService: LocalStorageService, private noticiasProvider : NoticiasProvider) {
    if (this.localStorageService.get("categorias") != null) {
      this.items = [];
      this.categoria = new Categoria();
      this.items = this.categoria.ListaCategorias(localStorageService);
    }

  }

  updateItem(item) {
    for (let i = 0; i < this.items.length; i++) {
      if (item.id == this.items[i].id) {
          if (item.selecionado) {
            this.items[i].selecionado = false;
            console.log("Categoria que sera removida: " + this.items[i].nome);
            this.noticiasProvider.removebyCategoria(item.id);
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
