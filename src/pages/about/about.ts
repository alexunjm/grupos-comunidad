import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListProvider, _ } from '../../providers/providers';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  list: any;
  groups: number;

  constructor(public navCtrl: NavController, private _listP: ListProvider) {
    this.groups = 8;

    this.list = _listP.getGroups();
  }

  generateGroups() {

    this._listP.getList().subscribe(data => {
      const unifiedList = _(data).flatMap((group) => group.persons);
      unifiedList.sort((prev, next) => prev.p.localeCompare(next.p));
      const grps = _(unifiedList).reduce(
        (acc, elm, index, initArr) => {
          const indexPerson = _(acc.usedIndex).randomNew(initArr.length - 1);
          acc.usedIndex.push(indexPerson);
          acc.list[index % this.groups].push(initArr[indexPerson]);
          return acc;
        }, {list: _([]).times(this.groups, (arr, i) => arr.push([]) ), usedIndex: [] }
      ).list;
      this.list = _(grps).map((elm, i) => ({name: 'grupo ' + (i + 1), persons: elm}));
      this._listP.saveGroups(this.list);
    }, error => console.log(error));

  }

  //65317048648

}
