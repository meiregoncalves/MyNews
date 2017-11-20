import { Categoria } from './categoria'
import { Site } from './sites'

export class Noticia {
  rowid: number;
  titulo: string;
  url: string;
  favorito: boolean;
  lida: boolean;
  comentario: string;
  categoria: Categoria;
  site: Site;
  constructor(titulo: string = "", url:string = "", favorito: boolean = false, lida: boolean = false, categoria: Categoria = new Categoria(), site:Site = new Site()) {
    this.titulo = titulo;
    this.url = url;
    this.favorito = favorito;
    this.lida = lida;
    this.categoria = categoria;
    this.site = site;
  }
}
