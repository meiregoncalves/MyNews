import { Categoria } from './categoria'
import { Site } from './sites'

export class Noticia {
  rowid: number;
  titulo: string;
  url: string;
  favorito: number;
  lida: number;
  deleted: number;
  comentario: string;
  categoria: Categoria;
  site: Site;
  constructor(titulo: string = "", url:string = "", favorito: number = 0, lida: number = 0, deleted: number = 0, categoria: Categoria = new Categoria(), site:Site = new Site()) {
    this.titulo = titulo;
    this.url = url;
    this.favorito = favorito;
    this.lida = lida;
    this.deleted = deleted;
    this.categoria = categoria;
    this.site = site;
  }
}
