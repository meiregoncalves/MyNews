export class Categoria {
  nome:string;
  id: number;
  selecionado: boolean;
  constructor(nome:string, selecionado:boolean, id: number) {
    this.nome = nome;
    this.id = id;
    this.selecionado = selecionado;
  }
}
