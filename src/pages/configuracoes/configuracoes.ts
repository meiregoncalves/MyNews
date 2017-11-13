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
  constructor(public navCtrl: NavController, public navParams: NavParams, private localStorageService: LocalStorageService) {
    if (this.localStorageService.get("sites") != null) {
      this.items = [];
      let array = JSON.parse(<string>this.localStorageService.get("sites"));
      for (let i = 0; i < array.length; i++) {
          let c = new Site(array[i].nome, array[i].selecionado, array[i].id);
          this.items.push(c);
      }
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
