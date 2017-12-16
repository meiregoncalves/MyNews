import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) { }

  public getDB() {
    return this.sqlite.create({
      name: 'mynews.db',
      location: 'default'
    });
  }

  public createDatabase() {
    return  this.sqlite.create({
  name: 'mynews.db',
  location: 'default'
})
  .then((db: SQLiteObject) => {

    db.executeSql('CREATE TABLE IF NOT EXISTS noticias (titulo varchar(250), url varchar(300), favorito int, lida int, deleted int, comentario text, idCategoria int, idSite int, dataGravacao DateTime)', {})
      .then(() => console.log('Executed SQL - Create Table'))
      .catch(e => console.log(e));
    db.close();

  })
  .catch(e => console.log(e));
  }
}
