import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NoticiasExibirPage} from '../noticias-exibir/noticias-exibir'
import { Categoria } from '../../models/categoria'
import { Site } from '../../models/sites'
import { LocalStorageService } from 'angular-2-local-storage';
import { FeedProvider, Feed } from  '../../providers/feed/feed' ;
import { Noticia } from  '../../models/noticia'
import { Cadastro_Feed } from  '../../models/cadastro_Feeds'

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
  listaCadastro_Feed : Cadastro_Feed[];
  LocalStorageService : LocalStorageService;
  constructor(public navCtrl: NavController, public navParams: NavParams, localStorage: LocalStorageService, public feedProvider : FeedProvider) {
    if (localStorage.get("categorias") == null) {
      this.inicializaStorage(localStorage);
    }
    this.listaCadastro_Feed = new Cadastro_Feed().ListaCadastro_Feeds(localStorage);
    this.selectedItem = navParams.get('item');
    this.LocalStorageService = localStorage;

    // this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    // 'american-football', 'boat', 'bluetooth', 'build'];
  }

  ionViewDidLoad() {
    this.getFeeds();
  }

  getFeeds() {
     this.feedProvider.getNoticiasbyURL(this.listaCadastro_Feed[0], this.LocalStorageService)
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
    this.inicializaCadastroFeeds(localStorage);
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

  inicializaCadastroFeeds(localStorage: LocalStorageService) {
    this.listaCadastro_Feed = [];

    var c = new Cadastro_Feed("https://pox.globo.com/rss/g1/economia", this.listaCategorias[2], this.listaSites[2]);
    this.listaCadastro_Feed.push(c);
    c = new Cadastro_Feed("http://esportes.r7.com/feed.xml", this.listaCategorias[4], this.listaSites[4]);
    this.listaCadastro_Feed.push(c);

    localStorage.set("Cadastro_Feeds", JSON.stringify(this.listaCadastro_Feed));
  }

}
