import { LocalStorageService } from 'angular-2-local-storage';

export class Site {
  nome:string;
  id: number;
  selecionado: boolean;
  constructor(nome:string = "", selecionado:boolean = false, id: number = 0) {
    this.nome = nome;
    this.selecionado = selecionado;
    this.id = id;
  }

  public ListaSites(localStorageService: LocalStorageService)
  {
    var items: Site[] = [];
    let array = JSON.parse(<string>localStorageService.get("sites"));
    for (let i = 0; i < array.length; i++) {
        let c = new Site(array[i].nome, array[i].selecionado, array[i].id);
        items.push(c);
    }
    return items;
  }
}
