import { LocalStorageService } from 'angular-2-local-storage';

export class Categoria {
  nome:string;
  id: number;
  selecionado: boolean;
  constructor(nome:string = "", selecionado:boolean = false, id: number = 0) {
    this.nome = nome;
    this.id = id;
    this.selecionado = selecionado;
  }

  public ListaCategorias(localStorageService: LocalStorageService)
  {
    var items: Categoria[] = [];
    let array = JSON.parse(<string>localStorageService.get("categorias"));
    if (array != null ) {
      for (let i = 0; i < array.length; i++) {
          let c = new Categoria(array[i].nome, array[i].selecionado, array[i].id);
          items.push(c);
      }
    }
    return items;
  }
}
