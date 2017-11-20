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
    var categorias : Categoria[] = this.categoria.ListaCategorias(localStorageService);
    var sites : Site[] = this.site.ListaSites(localStorageService);

    console.log("CATEGORIAS: " + JSON.stringify(categorias));
    console.log("SITES: " + JSON.stringify(sites));

    let array = JSON.parse(<string>localStorageService.get("Cadastro_Feeds"));
    if (array != null ) {
        for (let i = 0; i < array.length; i++) {
            let c = new Cadastro_Feed(array[i].url, categorias[array[i].categoria.id-1], sites[array[i].site.id-1],);
            items.push(c);
        }
    }
    return items;
  }
}
