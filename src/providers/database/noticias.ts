import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import { Noticia } from  '../../models/noticia';
import { Categoria } from  '../../models/categoria';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class NoticiasProvider {
  localStorage: LocalStorageService;
  constructor(private dbProvider: DatabaseProvider, localStorage: LocalStorageService) {
    this.localStorage = localStorage;
  }

  public insert(noticia: Noticia) {
    console.log('ADICIONOU NOTICIA aqui');
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        var myDate = new Date();
        let sql = 'insert into noticias (titulo, url, favorito, lida, comentario, idCategoria, idSite, dataGravacao) values (?, ?, ?, ?, ?, ?, ?, ?)';
        let data = [noticia.titulo, noticia.url, noticia.favorito, noticia.lida, noticia.comentario, noticia.categoria.id, noticia.site.id, myDate.getDate()];

        return db.executeSql(sql, data).then(()=> console.log('ADICIONOU NOTICIA'))
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public update(noticia: Noticia) {
    console.log("Noticia Editar: " + JSON.stringify(noticia));
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update noticias set favorito = ?, lida = ?, deleted = ? where rowid = ?';
        let data = [noticia.favorito, noticia.lida, noticia.deleted, noticia.rowid];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from noticias where rowid = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public removebyData(dias: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = "delete from noticias where favorito = 0 and dataGravacao < (date('now')-?) ";
        let data = [dias];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public removebyCategoria(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from noticias where idCategoria = ?';
        let data = [id];
        console.log("ID" + id);
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public removebySite(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from noticias where idSite = ?';
        let data = [id];
        console.log("id delete" + id);
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select rowid, titulo, url, favorito, lida, comentario, idCategoria, idSite from noticias where rowid = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let noticia = new Noticia(item.titulo, item.url, item.favorito, item.lida, item.categoria, item.site);
              return noticia;
            }

            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getByURL(url: string) {
    var noticia = new Noticia();
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select rowid, titulo, url, favorito, lida, comentario, idCategoria, idSite from noticias where url = ?';
        let data = [url];
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              noticia.url = item.url;
              return noticia;
            }
            return noticia;
          })
          .catch((e) => {console.error(e)
            return noticia;
          });
      })
      .catch((e) =>{console.error(e)
        return noticia;
      });
  }

  public tratarCategoria(id:number) {
      let categoria = new Categoria();
      let categorias = categoria.ListaCategorias(this.localStorage);
      for (let i = 0; i < categorias.length;i++) {
        if (id == categorias[i].id) {
          categoria = categorias[i];
        }
      }
      return categoria;
  }

  public getLimitado(titulo: string = null, limite:number, somenteFavoritos: boolean) {
    var noticias: Noticia[] = [];
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        var sql = 'select rowid, titulo, url, favorito, lida, comentario, idCategoria, idSite, deleted from noticias where rowid > 0 ';
        var data: any[] = [];

        if (titulo) {
          sql += ' and titulo like ?'
          data.push('%' + titulo + '%');
        }

        if (somenteFavoritos) {
          sql += ' and favorito = 1';
        }

        sql += ' order by idCategoria, lida '
        sql += ' LIMIT 15 OFFSET ' + limite;


        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              for (var i = 0; i < data.rows.length; i++) {
                var noticia = data.rows.item(i);

                console.log("categoria: " + noticia.idCategoria);

                noticia.categoria = this.tratarCategoria(noticia.idCategoria);
                console.log("categoria2: " + noticia.categoria);
                noticias.push(noticia);
              }
            }
            return noticias;
          })
          .catch((e) => {
             console.error(e);
             return noticias;
          })
      })
      .catch((e) => {
        console.error(e);
      return noticias;
    });
  }

  public getAll(titulo: string = null)  {
    var noticias: Noticia[] = [];
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        var sql = 'select rowid, titulo, url, favorito, lida, comentario, idCategoria, idSite from noticias';
        var data: any[] = [];

        if (titulo) {
          sql += ' and titulo like ?'
          data.push('%' + titulo + '%');
        }

        sql += ' order by lida desc'

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              for (var i = 0; i < data.rows.length; i++) {
                var noticia = data.rows.item(i);
                noticias.push(noticia);
              }
            }
            return noticias;
          })
          .catch((e) => {
             console.error(e);
             return noticias;
          })
      })
      .catch((e) => {
        console.error(e);
      return noticias;
    })
  }
}
