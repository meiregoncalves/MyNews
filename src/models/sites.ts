export class Site {
  nome:string;
  id: number;
  selecionado: boolean;
  constructor(nome:string, selecionado:boolean) {
    this.nome = nome;
    this.selecionado = selecionado;
  }
}
