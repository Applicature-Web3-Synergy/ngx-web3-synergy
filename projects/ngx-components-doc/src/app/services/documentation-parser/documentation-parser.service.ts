import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { DocFather } from './interfaces';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DocumentationParserService {
  /** Emits a value as soon as the jsonDoc is loaded */
  public onDataLoaded$: ReplaySubject<DocFather> = new ReplaySubject(1);

  /** The currently loaded documentation docs json */
  private _docFather: DocFather | null = null;

  public set docFather(docFather: DocFather) {
    this._docFather = docFather;
    this.onDataLoaded$.next(this._docFather);
  }

  constructor(private http: HttpClient) {
  }

  /**
   * Sorts DocFathers by decorator -> Input > Output > HostBinding > other > alphabetical.
   *
   * @param docFather1 - The first element to compare.
   * @param docFather2 - The second element to be compared with.
   * @param decorator  - The Decorator by which to sort in this iteration.
   */
  static sortByDecorator(
    docFather1: DocFather,
    docFather2: DocFather,
    decorator: 'Input' | 'Output' | 'HostBinding' = 'Input'
  ): number {
    if (docFather1.decorators) {
      // Element1 has decorators.
      if (!docFather2.decorators) {
        return -1;
      }

      const decoratorsElement1 = docFather1.decorators.map(dec => dec.name);
      const decoratorsElement2 = docFather2.decorators.map(dec => dec.name);

      if (decoratorsElement1.includes(decorator) && decoratorsElement2.includes(decorator)) {
        return decoratorsElement1.indexOf(decorator) - decoratorsElement2.indexOf(decorator);
      }

      if (decoratorsElement1.includes(decorator)) {
        return -1;
      } else if (decoratorsElement2.includes(decorator)) {
        return 1;
      } else {
        return DocumentationParserService.sortByDecorator(docFather1, docFather2, decorator === 'Input' ? 'Output' : 'HostBinding');
      }
    } else if (docFather2.decorators) {
      return -DocumentationParserService.sortByDecorator(docFather2, docFather1);
    } else {
      return docFather1.name.localeCompare(docFather2.name);
    }
  }

  public find(component: string): DocFather | undefined {
    if (!this._docFather) {
      return undefined;
    }
    return this.walkThroughTree(this._docFather, component);
  }

  /**
   * Recursively walks through the components-tree and searches for the part, where
   * the docFather's title is equals to the component argument.
   * @param data the docFather to walk through and search for the component.
   * @param component the component to be searched for in the docFather tree.
   */
  private walkThroughTree(data: DocFather, component: string): DocFather {
    if (!data?.children) {
      return null;
    }

    const child = data.children.find(child => child.name === component);

    if (!child) {
      for (const child of data.children) {
        const newChild = this.walkThroughTree(child, component);

        if (newChild) {
          return newChild;
        }
      }

      return null;
    }

    return child;
  }

  /**
   * Imports the doc file with the httpClient (So that we can take action if the file is not available)
   */
  public getDoc(): Observable<DocFather> {
    return this.http.get<DocFather>('./assets/jsons/doc.json');
    //
    // try {
    //   if (DocJson) {
    //     this.docFather = DocJson as DocFather;
    //   }
    // } catch (e) {
    //   console.warn(`To show the api -> run "npm run docs-typedoc" and restart the server`);
    // }
  }
}
