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
  defaultDir: string;

  constructor(public http: HttpClient, private file: File) {
    this.url = GLOBAL.url.dataResource;
    this.defaultDir = 'comunidad';
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

    if(this.file.dataDirectory) {

      var blob = new Blob([data], { type: "application/json;charset=utf-8" });

      this.file.checkDir(this.file.dataDirectory, this.defaultDir).then(
        _ => {

          this.file.writeFile(this.file.dataDirectory + this.defaultDir, fileName, blob, { replace: true }).then(() => {
            console.log("file created at: " + this.file.dataDirectory);
          }).catch(() => {
            console.error("error creating file at :" + this.file.dataDirectory);
          });
        }
      ).catch(
        err => {
          this.createDir();
          this.save(fileName, data);
        }
      );
    } else {
      localStorage.setItem('data', JSON.stringify(data));
    }

  }

  createDir() {
    this.file.createDir(this.file.dataDirectory, this.defaultDir, true).then(
      _ => console.log('Directory created', _)
    ).catch(
      err => {
        console.log(err);

      }
    );
  }

}
