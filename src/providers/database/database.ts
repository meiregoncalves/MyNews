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
    return this.getDB()
      .then((db: SQLiteObject) => {

        this.createTables(db);
      })
      .catch(e => console.log(e));
  }

  private createTables(db: SQLiteObject) {
    db.executeSql('CREATE TABLE IF NOT EXISTS noticias (titulo varchar(250), url varchar(300), favorito boolean, lida boolean, comentario text, idCategoria int, idSite int)', {})
      .then(() => console.log('Executed SQL'))
      .catch(e => console.log(e));
  }
}
