import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from '../default/generic';
import { Observable } from 'rxjs/Observable';
import { File } from '@ionic-native/file';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
  url: string;

  constructor(public http: HttpClient, private file: File) {
    this.url = GLOBAL.url.dataResource;
  }

  get(endpoint: string, params?: any, reqOpts?: any): Observable<ArrayBuffer>{
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(this.url + endpoint + '.json', reqOpts);
  }

  save(fileName: string, data: any) {
    var blob = new Blob(["Hello, world!"], { type: "text/plain;charset=utf-8" });

    console.log(this.file.dataDirectory);

    this.file.writeFile(this.url + 'groups', fileName, blob, { replace: true }).then(() => {
      alert("file created at: " + this.url + 'groups');
    }).catch(() => {
      alert("error creating file at :" + this.url + 'groups');
    });
  }

}
