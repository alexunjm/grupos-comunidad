
/**
  @author
  Alexander Jaramillo
  alexunjm@gmail.com
*/
export class DefaultProvider {
  items: Array<any>;

  constructor(provider, endpoint){

    provider.get(endpoint).subscribe((res: any) => {
      this.items = res.data;
    }, err => {
      console.error('ERROR', err);
    });
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }
}
