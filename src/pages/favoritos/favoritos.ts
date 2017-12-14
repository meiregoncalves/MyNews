import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalStorageService } from 'angular-2-local-storage';
import { FeedProvider, Feed } from  '../../providers/feed/feed' ;
import { Noticia } from  '../../models/noticia'

/**
 * Generated class for the FavoritosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favoritos',
  templateUrl: 'favoritos.html',
})
export class FavoritosPage {
  items: Noticia[];
  LocalStorageService : LocalStorageService;
  tolerancia: number = 0;
  limite: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, localStorage: LocalStorageService, public feedProvider : FeedProvider) {
  }

  ionViewDidLoad() {
    this.setItems();
  }

  setItems() {
    this.feedProvider.GetLocalNoticiasLim(this.limite, true).then(noticia => {
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

  itemAbrir(event, item) {
      window.open(item.url,'_system');
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.feedProvider.GetLocalNoticiasLim(this.limite, true).then(noticia=> {
        for (let i = 0; i < noticia.length; i++) {
            this.items.push(noticia[i]);
        }
        this.limite+=15;
      });
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

}
