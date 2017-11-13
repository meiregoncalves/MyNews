import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NoticiasExibirPage} from '../noticias-exibir/noticias-exibir'
import { Categoria } from '../../models/categoria'
import { LocalStorageService } from 'angular-2-local-storage';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  listaCategorias: Categoria[];
  constructor(public navCtrl: NavController, public navParams: NavParams, localStorage: LocalStorageService) {
    if (localStorage.get("categorias") == null) {
      this.listaCategorias = [];
      this.inicializaStorage(localStorage);
    }
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(NoticiasExibirPage, {
      item: item
    });
  }

  inicializaStorage( localStorage: LocalStorageService) {

    var c = new Categoria("Beleza", true, 1);
    this.listaCategorias.push(c);
    c = new Categoria("Cultura", true, 2);
    this.listaCategorias.push(c);
    c = new Categoria("Economia", true, 3);
    this.listaCategorias.push(c);
    c = new Categoria("Educação", true, 4);
    this.listaCategorias.push(c);
    c = new Categoria("Esporte", true, 5);
    this.listaCategorias.push(c);
    c = new Categoria("Tecnologia", true, 6);
    this.listaCategorias.push(c);

    localStorage.set("categorias", JSON.stringify(this.listaCategorias));

  }

}
