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
  tolerancia: number = 0;
  limite: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, localStorage: LocalStorageService, public feedProvider : FeedProvider) {
    if (localStorage.get("categorias") == null) {
      this.inicializaStorage(localStorage);
    } else {
      this.listaCadastro_Feed = new Cadastro_Feed().ListaCadastro_Feeds(localStorage);
    }
    this.selectedItem = navParams.get('item');
    this.LocalStorageService = localStorage;
  }

  ionViewDidLoad() {
    this.getFeeds();
  }

  setItems() {
    this.feedProvider.GetLocalNoticiasLim(this.limite, false).then(noticia => {
      this.limite = 15;
      console.log("NOTICIAS TRAZIDAS: " + JSON.stringify(noticia));
      if (noticia.length == 0 && this.tolerancia < 5) {
        this.tolerancia++;
        setTimeout(5000,this.setItems());
      } else {
        this.items = noticia;
      }
    });
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.feedProvider.GetLocalNoticiasLim(this.limite, false).then(noticia=> {
        for (let i = 0; i < noticia.length; i++) {
            this.items.push(noticia[i]);
        }
        this.limite+=15;
      });
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  getFeeds() {
    this.listaCadastro_Feed = new Cadastro_Feed().ListaCadastro_Feeds(this.LocalStorageService);
    var count = 0, el = 0;
    var ativos = this.listaCadastro_Feed.length;
    for (; count < this.listaCadastro_Feed.length; count++) {
      if (this.listaCadastro_Feed[count].site.selecionado && this.listaCadastro_Feed[count].categoria.selecionado) {
        console.log("Site selecionado: " + JSON.stringify(this.listaCadastro_Feed[count]));
        this.feedProvider.getNoticiasbyURL(this.listaCadastro_Feed[count], this.LocalStorageService).subscribe(noticias => {
          el++;
          if (el == ativos) {
            setTimeout(5000,this.setItems());
            //this.items = noticias;
          }
        });
      } else {
        ativos--;
      }
    }
  }

  itemFavoritar(event, item) {
      console.log("Favorito " + item.favorito);
      item.favorito = item.favorito==1 ? 0 : 1;
      this.feedProvider.UpdateNoticia(item);
  }

  itemFechar(event, item) {
      item.deleted = 1;
      this.feedProvider.UpdateNoticia(item);
      this.doInfinite(null);
  }
  itemAbrir(event, item) {
    console.log("entrou pag: " + JSON.stringify(item));
    //marca como lida
    if (item.lida != 1) {
      item.lida = 1;
      this.feedProvider.UpdateNoticia(item);
    }
    window.open(item.url,'_system', 'location=yes');
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
    s = new Site("Uol", true, 4);
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
    //Beleza Cultura Economia Educacao Esporte Tecnologia

    this.feedEstadao("http://www.estadao.com.br/rss/");

    this.feedFolha("http://feeds.folha.uol.com.br/folha/")

    this.feedG1("http://oglobo.globo.com/rss/", "http://pox.globo.com/rss/g1/");

    this.feedUOL("http://rss.uol.com.br/feed/", "http://esporte.uol.com.br/", "http://tecnologia.uol.com.br/");

    localStorage.set("Cadastro_Feeds", JSON.stringify(this.listaCadastro_Feed));
  }
  feedEstadao(url: string) {
    //Beleza Cultura Economia Educacao Esporte Tecnologia
    var c = new Cadastro_Feed(url+"cultura.xml", this.listaCategorias[1], this.listaSites[0]);
    this.listaCadastro_Feed.push(c);

    c = new Cadastro_Feed(url+"economia.xml", this.listaCategorias[2], this.listaSites[0]);
    this.listaCadastro_Feed.push(c);

    c = new Cadastro_Feed(url+"educacao.xml", this.listaCategorias[3], this.listaSites[0]);
    this.listaCadastro_Feed.push(c);

    c = new Cadastro_Feed(url+"esportes.xml", this.listaCategorias[4], this.listaSites[0]);
    this.listaCadastro_Feed.push(c);

    c = new Cadastro_Feed(url+"tecnologia.xml", this.listaCategorias[5], this.listaSites[0]);
    this.listaCadastro_Feed.push(c);
  }

  feedFolha(url: string) {
    //Beleza Cultura Economia Educacao Esporte Tecnologia
    var c = new Cadastro_Feed(url+"dinheiro/rss091.xml", this.listaCategorias[2], this.listaSites[1]);
    this.listaCadastro_Feed.push(c);

    c = new Cadastro_Feed(url+"educacao/rss091.xml", this.listaCategorias[3], this.listaSites[1]);
    this.listaCadastro_Feed.push(c);

    c = new Cadastro_Feed(url+"informatica/rss091.xml", this.listaCategorias[5], this.listaSites[1]);
    this.listaCadastro_Feed.push(c);
  }

  feedG1(url: string, url2:string) {
    //Beleza Cultura Economia Educacao Esporte Tecnologia
    var c = new Cadastro_Feed(url2+"ciencia-e-saude", this.listaCategorias[0], this.listaSites[2]);
    this.listaCadastro_Feed.push(c);

    c = new Cadastro_Feed(url+"plantaocultura.xml", this.listaCategorias[1], this.listaSites[2]);
    this.listaCadastro_Feed.push(c);

    c = new Cadastro_Feed(url2+"economia", this.listaCategorias[2], this.listaSites[2]);
    this.listaCadastro_Feed.push(c);

    c = new Cadastro_Feed(url2+"educacao", this.listaCategorias[3], this.listaSites[2]);
    this.listaCadastro_Feed.push(c);

    c = new Cadastro_Feed(url2+"esporte", this.listaCategorias[4], this.listaSites[2]);
    this.listaCadastro_Feed.push(c);

    c = new Cadastro_Feed(url2+"tecnologia", this.listaCategorias[5], this.listaSites[2]);
    this.listaCadastro_Feed.push(c);

  }

  feedUOL(url: string, url2: string, url3: string) {
    //Beleza Cultura Economia Educacao Esporte Tecnologia
    var c = new Cadastro_Feed(url+"economia.xml", this.listaCategorias[2], this.listaSites[3]);
    this.listaCadastro_Feed.push(c);

    c = new Cadastro_Feed(url+"vestibular.xml", this.listaCategorias[3], this.listaSites[3]);
    this.listaCadastro_Feed.push(c);

    c = new Cadastro_Feed(url2+"ultimas/index.xml", this.listaCategorias[4], this.listaSites[3]);
    this.listaCadastro_Feed.push(c);

    c = new Cadastro_Feed(url3+"ultnot/index.xml", this.listaCategorias[5], this.listaSites[3]);
    this.listaCadastro_Feed.push(c);
  }
}
