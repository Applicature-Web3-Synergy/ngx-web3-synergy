import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';

import { DocFather, DocumentationParserService } from '../services/documentation-parser';

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {
  constructor(private docService: DocumentationParserService) {
  }

  static factory(appLoadService: AppInitializerService): () => Promise<void> {
    return () => appLoadService.getDocs();
  }

  getDocs(): Promise<void> {
    return this.docService.getDoc()
      .pipe(
        catchError(() => of(null)),
        tap((res: DocFather) => {
          this.docService.docFather = res;
        }),
        map(() => null)
      )
      .toPromise();
  }
}
