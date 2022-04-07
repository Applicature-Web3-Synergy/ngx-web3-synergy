import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { take } from 'rxjs/operators';

import { ComponentDoc } from './interfaces';
import { DOC_GROUP_TITLE } from './enums/doc-group-title.enum';
import { DocFather, DocumentationParserService } from '../../../../services/documentation-parser';


@Component({
  selector: 'doc-api-container',
  templateUrl: './api-container.component.html',
  styleUrls: ['./api-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApiContainerComponent implements AfterContentInit {
  /** The component the documentation should be visualized for. */
  @Input()
  public components!: string[];

  /** Array containing all the docs of the components input. */
  public componentsDocs: ComponentDoc[] = [];

  /** Flag to indicate if some data could be loaded - otherwise the message to run "yarn doc" first will occur */
  public wasLoaded = false;

  constructor(
    public documentationParserService: DocumentationParserService,
    private readonly cd: ChangeDetectorRef
  ) { }

  /**
   * Inits the componentsDocs array by calling the documentationParserService and
   * filtering for those components given by the components input.
   */
  public ngAfterContentInit(): void {
    if (!this.components) {
      return;
    }
    this.documentationParserService.onDataLoaded$
      .pipe(take(1))
      .subscribe(wasLoaded => {
        this.wasLoaded = !!wasLoaded;
        if (wasLoaded) {
          this.componentsDocs = [];
          this.components.forEach(component => {
            const docFather = this.documentationParserService.find(component);

            if (!docFather) {
              return;
            }
            const componentDoc: ComponentDoc = { component, docFather };
            componentDoc.constructors = this.arraySetup(componentDoc.docFather, DOC_GROUP_TITLE.CONSTRUCTOR);
            componentDoc.accessors = this.arraySetup(componentDoc.docFather, DOC_GROUP_TITLE.ACCESSORS);
            componentDoc.methods = this.arraySetup(componentDoc.docFather, DOC_GROUP_TITLE.METHODS);
            componentDoc.functions = this.arraySetup(componentDoc.docFather, DOC_GROUP_TITLE.FUNCTIONS);
            componentDoc.properties = this.arraySetup(componentDoc.docFather, DOC_GROUP_TITLE.PROPERTIES)
              .filter(child =>
                (child.flags.isProtected || child.flags.isPublic) && !child.flags?.isConstructorProperty
              )
              .sort(DocumentationParserService.sortByDecorator);
            this.componentsDocs.push(componentDoc);
          });
          this.cd.markForCheck();
        }
      });
  }

  /**
   * Returns the first accessor parameter.
   *
   * @param docFather - The DocFather to be searched for the accessor parameters
   */
  public getAccessorsParameters(docFather: DocFather): string {
    for (const keyName of [ 'bindingPropertyName', 'hostPropertyName', 'type.name', 'type.types' ]) {
      const keys = this.findKeys(docFather, keyName);
      if (keys.length > 0) {
        return keys[0];
      }
    }
    return '';
  }

  /**
   * Iterates through the object, searches for the keyName
   * and returns an array of results matching the keyName.
   *
   * @param inspectedObject - The object to get inspected
   * @param keyName         - The name of the key to be found
   */
  private findKeys(inspectedObject: any, keyName: string): string[] {
    const results = [];
    if (typeof inspectedObject === 'object') {
      if (inspectedObject.hasOwnProperty(keyName)) {
        return [ inspectedObject[keyName].toString() ];
      } else {
        for (const key in inspectedObject) {
          if (inspectedObject[key]) {
            results.push(...this.findKeys(inspectedObject[key], keyName));
          }
        }
      }
    }

    return results;
  }

  /**
   * Sets up the array identified by title.
   *
   * @param title - The title of the component doc snippets to save into the array.
   */
  private arraySetup(docFather: DocFather, title: DOC_GROUP_TITLE): Array<DocFather> {
    if (!docFather) {
      return [];
    }

    const group = docFather.groups.find(group => group.title === title);

    if (group) {
      return docFather.children.filter(child => group.children.includes(child.id));
    }

    return [];
  }
}
