import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import { Noticia } from  '../../models/noticia';

@Injectable()
export class NoticiasProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(noticia: Noticia) {
    console.log('ADICIONOU NOTICIA aqui');
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into noticias (titulo, url, favorito, lida, comentario, idCategoria, idSite) values (?, ?, ?, ?, ?, ?, ?)';
        let data = [noticia.titulo, noticia.url, noticia.favorito, noticia.lida, noticia.comentario, noticia.categoria.id, noticia.site.id];

        return db.executeSql(sql, data).then(()=> console.log('ADICIONOU NOTICIA'))
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public update(noticia: Noticia) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update noticias set titulo = ?, url = ?, favorito = ?, lida = ?, comentario = ?, idCategoria = ?, idSite = ? where rowid = ?';
        let data = [noticia.titulo, noticia.url, noticia.favorito, noticia.lida, noticia.comentario, noticia.categoria.id, noticia.site.id, noticia.rowid];

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
