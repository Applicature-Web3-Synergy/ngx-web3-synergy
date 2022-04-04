import { Component, ChangeDetectionStrategy, Input, AfterContentInit, ChangeDetectorRef } from "@angular/core";

// import { DocFather, DocFathers, DocGroupTitle } from "../sharedDataTypes";
import { take } from "rxjs/operators";
import { DocumentationParserService } from '../../services';

type DocFather = any;
type DocFathers = any;
type DocGroupTitle = any;

interface ComponentDoc {
  component: string;
  docFather: DocFather;
  constructors?: DocFathers;
  properties?: DocFathers;
  accessors?: DocFathers;
  methods?: DocFathers;
  functions?: DocFathers;
}

/**
 * Sorts DocFathers by decorator -> Input > Output > HostBinding > other > alphabetical.
 *
 * @param docFather1 - The first element to compare.
 * @param docFather2 - The second element to be compared with.
 * @param decorator  - The Decorator by which to sort in this iteration.
 */
function sortByDecorator(
  docFather1: DocFather,
  docFather2: DocFather,
  decorator: "Input" | "Output" | "HostBinding" = "Input"
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
      return sortByDecorator(docFather1, docFather2, decorator === "Input" ? "Output" : "HostBinding");
    }

  } else if (docFather2.decorators) {
    return -sortByDecorator(docFather2, docFather1);
  } else {
    return docFather1.name.localeCompare(docFather2.name);
  }
}

@Component({
  selector: 'demo-doc-view',
  templateUrl: './doc-view.component.html',
  styleUrls: ['./doc-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocViewComponent implements AfterContentInit {
  /** The component the documentation should be visualized for. */
  @Input()
  public components!: Array<string>;

  /** Array containing all the docs of the components input. */
  public componentsDocs: Array<ComponentDoc> = [];

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
            const componentDoc: ComponentDoc = {component, docFather};
            componentDoc.constructors = this.arraySetup(componentDoc.docFather, "Constructors");
            componentDoc.accessors = this.arraySetup(componentDoc.docFather, "Accessors");
            componentDoc.methods = this.arraySetup(componentDoc.docFather, "Methods");
            componentDoc.functions = this.arraySetup(componentDoc.docFather, "Functions");
            componentDoc.properties = this.arraySetup(componentDoc.docFather, "Properties")
              .filter(child =>
                (child.flags.isProtected || child.flags.isPublic) && !child.flags.isConstructorProperty
              )
              .sort(sortByDecorator);
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
    for (const keyName of [ "bindingPropertyName", "hostPropertyName", "type.name", "type.types" ]) {
      const keys = this.findKeys(docFather, keyName);
      if (keys.length > 0) {
        return keys[0];
      }
    }
    return "";
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
    if (typeof inspectedObject === "object") {
      if (inspectedObject.hasOwnProperty(keyName)) {
        return [inspectedObject[keyName].toString()];
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
  private arraySetup(docFather: DocFather, title: DocGroupTitle): Array<DocFather> {
    if (!docFather) {
      return [];
    }
    const group = docFather.groups.find(group => group.title === title);
    if (group) {
      return docFather.children.filter(child => group.children.includes(child.id));
    } else {
      return [];
    }
  }
}
