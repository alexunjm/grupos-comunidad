import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DefaultProvider } from '../default/default';
import { DataProvider } from '../api/data';

/**
  @author
  Alexander Jaramillo
  alexunjm@gmail.com
*/

export interface PageInterface {
  title: string;
  page: any;
  category?: number;
  subs?: any;
  index?: number;
  showSubs?: boolean;
}

@Injectable()
export class ListProvider extends DefaultProvider {

  pages: Array<PageInterface>;

  constructor(private dataProvider: DataProvider) {
    super(dataProvider, 'list');
  }

  getList(): Observable<ArrayBuffer> {
    let obs = this.dataProvider.get('list');
    obs.subscribe((res: any) => {
      this.items = res.data;
    }, err => {
      console.error('ERROR', err);
    });
    return obs;
  }

}
