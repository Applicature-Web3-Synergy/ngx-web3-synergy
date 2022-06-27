import { Injectable } from '@angular/core';


@Injectable()
export class CardHelperService {
  public notExpandedSet: Set<string>;
  private notExpandsLsKey = 'demo-not-expanded-cards';

  constructor() {
    const expandsList: string[] = JSON.parse(localStorage.getItem(this.notExpandsLsKey));
    this.notExpandedSet = new Set<string>(expandsList ?? []);
  }

  public toggleExpand(title: string, expanded: boolean): void {
    if (!expanded) {
      this.notExpandedSet.add(title);
    } else {
      this.notExpandedSet.delete(title);
    }

    localStorage.setItem(this.notExpandsLsKey, JSON.stringify([ ...(this.notExpandedSet.values() || []) ]));
  }
}
