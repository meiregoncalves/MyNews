import { LocalStorageService } from 'angular-2-local-storage';
import { Categoria } from './categoria'
import { Site } from './sites'

export class Cadastro_Feed {
  url:string;
  categoria: Categoria;
  site: Site;

  constructor(url:string = "", categoria : Categoria = new Categoria(), site : Site = new Site()) {
    this.url = url;
    this.categoria = categoria;
    this.site = site;
  }

  public ListaCadastro_Feeds(localStorageService: LocalStorageService)
  {
    var items: Cadastro_Feed[] = [];
    let array = JSON.parse(<string>localStorageService.get("Cadastro_Feeds"));
    if (array != null ) {
        for (let i = 0; i < array.length; i++) {
            let c = new Cadastro_Feed(array[i].url, array[i].categoria, array[i].site);
            items.push(c);
        }
    }
    return items;
  }
}
