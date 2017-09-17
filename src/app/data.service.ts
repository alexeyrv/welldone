import { Injectable } from '@angular/core';
import {Phone} from './phone';

// pouchdb add
//import * as PouchDB from 'pouchdb';  
import PouchDB from 'pouchdb';

import pouchdbFindPlugin from 'pouchdb-find';
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';


//### To enable debugging with the PouchDB Inspector Plugin
    //declare function require(arg:string): any;
    //var PouchDB = require('pouchdb');
declare global {
    interface Window {
        PouchDB: any;
    }
}
window.PouchDB = PouchDB;
//alert( window.PouchDB );

/*declare global {
    interface Window {
        sqlitePlugin : any;
    }
}
window.sqlitePlugin  = cordovaSqlitePlugin;
alert( window.sqlitePlugin  );
*/

@Injectable()
export class DataService{

    public data: Phone[] = [
        { id:0, name: "0 Apple iPhone 7", price: 56000},
        { id:1, name: "1 HP Elite x3", price: 56000},
        { id:2, name: "2 Alcatel Idol S4", price: 25000}
    ];

/******* PouchDB  START */
    private _db;
//    private _birthdays;

    constructor() {
        this.initDB();

        this._db.createIndex({ index: {fields: ['name', 'ts', 'bd'] }
        })
    }

    initDB() {
        PouchDB.plugin(pouchdbFindPlugin);

        PouchDB.plugin(cordovaSqlitePlugin);
        this._db = new PouchDB('1db');//, { adapter: 'cordova-sqlite' });
        //this._db = new PouchDB('1db', { adapter: 'websql' });

        console.log( "data: ", this.data );
    }

    add(birthday) {  
        //test add pouchdb
        this._db.allDocs({include_docs: true, descending: true}, function(err, doc) {
            //alert( JSON.stringify(doc) );
        });        
        
        //this.data.push( { id:99, name: "Gnusmas", price: 999} );

        var self = this;


        this._db.find( { 
            selector: {
                ts: {$gte: 1494354825549} 
            } 
        } )
        .then( function(doc) {
            //console.log( "finded : ", (doc.docs) );

            for( var i=0; i<doc.docs.length; i++ ) {
            var p = {
                id: -1,
                name: doc.docs[i].name,
                price: doc.docs[i].ts 
                }
            console.log("P= ", p);
            self.data.push( p );
            }
            console.log( "data: ", self.data );

            //this.data.push( doc.docs );


        }).catch( function(err) { console.log(err); });


        this._db.get("465F054E-EC91-7DFC-83CD-67EF2565A87F")
        .then( function(doc) {
            console.log( (doc) );
        }).catch( function(err) { console.log(err); });
        

//        console.log("Get: " + JSON.stringify( this._db.get('1dbc') ) );
//        console.log("Get: " + this._db.get('1dbc') );

        //alert("try add to db");
        //birthday = { name:"test nam", bd: Date().toString(),
        //            ts: Date.now() };
        //return this._db.post( birthday );
    }   

/******* PouchDB END */

    getData(): Phone[] {
        return this.data;
    }

    addData(name: string, price: number){
        var id = this.data.length;
        //alert( this.data.length );
        this.data.push(new Phone(id, name, price));
    }

    delLast() {
        this.data.pop();
    }
}
