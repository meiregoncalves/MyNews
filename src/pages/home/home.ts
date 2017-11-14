import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NoticiasExibirPage} from '../noticias-exibir/noticias-exibir'
import { Categoria } from '../../models/categoria'
import { Site } from '../../models/sites'
import { LocalStorageService } from 'angular-2-local-storage';
import { FeedProvider, Feed } from  '../../providers/feed/feed' ;
import { Noticia } from  '../../models/noticia'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  selectedItem: any;
  icons: string[];
  items: Noticia[];
  listaCategorias: Categoria[];
  listaSites: Site[];
  categoria: Categoria;
  site: Site;
  constructor(public navCtrl: NavController, public navParams: NavParams, localStorage: LocalStorageService, public feedProvider : FeedProvider) {
    if (localStorage.get("categorias") == null) {
      this.inicializaStorage(localStorage);
    }
    this.categoria = new Categoria();
    this.site = new Site();
    this.listaCategorias = this.categoria.ListaCategorias(localStorage);
    this.listaSites = this.site.ListaSites(localStorage);
    this.selectedItem = navParams.get('item');

    // this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    // 'american-football', 'boat', 'bluetooth', 'build'];
  }

  ionViewDidLoad() {
    this.getFeeds();
  }

  getFeeds() {
     this.feedProvider.getNoticiasbyURL('https://noticias.r7.com/feed.xml', this.categoria, this.site)
     .subscribe(
       noticias => this.items = noticias
    )
  }

  itemTapped(event, item) {
    this.navCtrl.push(NoticiasExibirPage, {
      item: item
    });
  }

  inicializaStorage( localStorage: LocalStorageService) {
    this.inicializaCategorias(localStorage);
    this.inicializaConfiguracao(localStorage);
  }
  inicializaConfiguracao(localStorage: LocalStorageService) {
    this.listaSites = [];
    var s = new Site("Estadão", true, 1);
    this.listaSites.push(s);
    s = new Site("Folha", true, 2);
    this.listaSites.push(s);
    s = new Site("G1", true, 3);
    this.listaSites.push(s);
    s = new Site("Terra", true, 4);
    this.listaSites.push(s);
    s = new Site("Uol", true, 5);
    this.listaSites.push(s);
    localStorage.set("sites", JSON.stringify(this.listaSites));
  }
  inicializaCategorias(localStorage: LocalStorageService) {
    this.listaCategorias = [];

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
