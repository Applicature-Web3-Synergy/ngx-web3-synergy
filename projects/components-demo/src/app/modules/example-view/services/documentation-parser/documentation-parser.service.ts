import { Injectable } from '@angular/core';

import { map, Observable, ReplaySubject } from 'rxjs';
import * as DocJson from '../../../../../../../../doc/doc.json';
// import * as DocJson from '../../../../../assets/doc/doc.json';

// import { DocFather } from "../sharedDataTypes";
export type DocFather = any;

@Injectable()
export class DocumentationParserService {
  /** Emits a value as soon as the jsonDoc is loaded */
  public onDataLoaded$: ReplaySubject<DocFather> = new ReplaySubject(1);

  /** The currently loaded documentation docs json */
  private _docFather: DocFather | null = null;

  constructor() {
    this.importFile();
  }

  public find(component: string): DocFather | undefined {
    if (!this._docFather) {
      return undefined;
    }
    return this.walkThroughTree(this._docFather, component);
  }

  public set docFather(docFather: DocFather) {
    this._docFather = docFather;
    this.onDataLoaded$.next(this._docFather);
  }

  /**
   * Recursively walks through the components-tree and searches for the part, where
   * the docFather's title is equals to the component argument.
   * @param data the docFather to walk through and search for the component.
   * @param component the component to be searched for in the docFather tree.
   */
  private walkThroughTree(data: DocFather, component: string): DocFather | undefined {
    if (!data?.children) {
      return;
    }
    const child = data.children.find(child => child.name === component);
    if (!child) {
      for (const child of data.children) {
        const newChild = this.walkThroughTree(child, component);
        if (newChild) {
          return newChild;
        }
      }
      return;
    } else {
      return child;
    }
  }

  /**
   * Imports the doc file with the httpClient (So that we can take action if the file is not available)
   */
  private importFile(): void {
    try {
      if (DocJson) {
        this.docFather = DocJson;
      }
    } catch (e) {
      console.warn(`To show the api -> run "yarn doc" and restart the server`);
    }

  }
}
