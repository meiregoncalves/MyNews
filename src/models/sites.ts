export class Site {
  nome:string;
  id: number;
  selecionado: boolean;
  constructor(nome:string, selecionado:boolean, id: number) {
    this.nome = nome;
    this.selecionado = selecionado;
    this.id = id;
  }
}
