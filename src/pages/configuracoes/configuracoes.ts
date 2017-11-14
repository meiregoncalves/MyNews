import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Site } from '../../models/sites'
import { LocalStorageService } from 'angular-2-local-storage';

/**
 * Generated class for the ConfiguracoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html',
})
export class ConfiguracoesPage {
  items: Site[];
  site : Site;
  constructor(public navCtrl: NavController, public navParams: NavParams, private localStorageService: LocalStorageService) {
    if (this.localStorageService.get("sites") != null) {
      this.items = [];
      this.site = new Site();
      this.items = this.site.ListaSites(localStorageService);
    }
  }


    updateSite(item) {
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
      this.localStorageService.set("sites", JSON.stringify(this.items));
    }

    itemTapped(event, item) {
      //this.updateItem(item);

      // That's right, we're pushing to ourselves!
      this.navCtrl.push(ConfiguracoesPage);
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad ConfiguracoesPage');
    }

}
