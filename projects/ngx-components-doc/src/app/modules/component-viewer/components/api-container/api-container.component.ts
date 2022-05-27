import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { take } from 'rxjs/operators';

import { ComponentDoc } from './interfaces';
import { DOC_GROUP_TITLE } from './enums/doc-group-title.enum';
import {
  DocDecorator,
  DocFather,
  DocFlags,
  DocType,
  DocumentationParserService
} from '../../../../services/documentation-parser';


@Component({
  selector: 'doc-api-container',
  templateUrl: './api-container.component.html',
  styleUrls: [ './api-container.component.scss' ],
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
            const dd = this.arraySetup(componentDoc.docFather, DOC_GROUP_TITLE.PROPERTIES)
              .filter(child =>
                (child.flags.isProtected || child.flags.isPublic) && !child.flags?.isConstructorProperty
              );

            componentDoc.properties = dd.sort(DocumentationParserService.sortByDecorator);

            this.componentsDocs.push(componentDoc);
          });

          this.cd.markForCheck();
        }
      });
  }

  /** Returns flag value, private, protected, public ... */
  public getFlag(flags: DocFlags): string {
    if (!flags) {
      return '';
    }
    const {
      isPublic,
      isPrivate,
      isProtected,
      isConstructorProperty
    } = flags ?? {};

    if (isConstructorProperty) {
      return '';
    }

    if (isPrivate) {
      return 'private ';
    }

    if (isProtected) {
      return 'protected ';
    }

    if (isPublic) {
      return 'public ';
    }

    return '';
  }

  public getType(doc: DocFather): string {
    if (!doc) {
      return '';
    }

    let type: DocType = doc.type;

    if (!type) {
      const signature = ((doc.getSignature || doc.setSignature) ?? []).find(el => el.name === doc.name);

      if (signature) {
        return this.getType(signature);
      }

      return '';
    }

    if (type.type === 'array' && type?.elementType) {
      return `${this.getType({ type: type?.elementType } as DocFather)}[]`;
    }

    if (type.type === 'query' && type?.queryType) {
      return `${this.getType({ type: type.queryType } as DocFather)}`;
    }

    if (type.type === 'union' && type?.types?.length) {
      const typeVal: string = type.types
        .filter(item => !!(item.value ?? item.name))
        .map(item => item.value ?? item.name).join(' | ');

      return `: ${typeVal}`;
    }

    if (type.type === 'reflection' && type?.declaration) {
      let typeVal = '';

      if (type.declaration?.indexSignature?.parameters?.length) {
        const docSig: DocFather = type.declaration.indexSignature;
        const docParam: DocFather = type.declaration.indexSignature.parameters[0];
        typeVal = `[${docParam?.name}${this.getType(docParam)}]${this.getType(docSig)}`;
      }

      if (type.declaration?.children?.length) {
        type.declaration?.children.forEach((el: DocFather) => {
          typeVal = typeVal + `, ${el.name}${this.getType(el)}`;
        })
      }

      return typeVal.length ? `: {${typeVal}}` : '';
    }

    let typeArgs = '';
    if (type.type === 'reference' && type.typeArguments?.length) {
      const typeVal: string = type.typeArguments
        .map(item => this.getType({ type: item } as DocFather)
          .replace(':', '')
          .trim()
        )
        .filter(item => item?.length)
        .join(', ');

      typeArgs = `<${typeVal}>`;
    }

    const typeName = type?.name
      ? type.name === 'default' ? type?.qualifiedName ?? '' : type.name
      : '';
    return typeName ? `${doc?.flags?.isOptional ? '?' : ''}: ${typeName}${typeArgs}` : '';
  }

  public getDecorators(docDecorators: DocDecorator[]): string[] {
    return docDecorators?.length
      ? docDecorators.filter((decorator: DocDecorator) => decorator?.name)
        .map((decorator: DocDecorator) => {
          if (!decorator) {
            return '';
          }

          const args: string[] = [];

          if (decorator.arguments?.hostPropertyName) {
            args.push(decorator.arguments?.hostPropertyName);
          } else if (decorator.arguments?.bindingPropertyName) {
            args.push(decorator.arguments?.bindingPropertyName);
          } else if (decorator?.arguments?.selector) {
            args.push(decorator?.arguments?.selector);
          }

          if (decorator.arguments?.opts) {
            args.push(decorator.arguments?.opts);
          }

          return `@${decorator.name}(${args.join(', ')})`
        })
      :[];
  }

  public getMethodAsSting(method: DocFather): { code: string, comments: string[], decorators: string[] } {
    if (!method) {
      return null;
    }

    const isAccessor = method.kindString === 'Accessor';

    const comments: string[] = [];

    if (method.comment?.shortText) {
      comments.push(method.comment.shortText);
    }

    if (method.comment?.returns) {
      comments.push(`Returns ${method.comment.returns}`);
    }

    const flag = this.getFlag(method.flags);
    // const decorators = method.decorators?.length
    //   ? method.decorators
    //     .filter((decorator: DocDecorator) => decorator?.name)
    //     .map((decorator: DocDecorator) => {
    //       const args = decorator?.arguments?.hostPropertyName
    //         ?? decorator?.arguments?.bindingPropertyName
    //         ?? '';
    //
    //       return `@${decorator.name}(${args})`
    //     }).join(' ')
    //   : '';

    const decorators = this.getDecorators(method?.decorators)

    const signature: DocFather = (isAccessor
      ? (method.getSignature ?? method.setSignature)
      : (method.signatures) ?? [])
      .filter((signature: DocFather) => method.name === signature.name)[0];

    if (signature?.comment?.shortText) {
      comments.push(signature.comment.shortText);
    }

    if (signature.comment?.returns) {
      comments.push(`Returns ${signature.comment.returns}`);
    }

    const signatureType: string = !signature?.type?.name ? '' : `${this.getType(signature)}`;

    const methodArguments: string = !signature
      ? ''
      : (signature.parameters || []).map((param: DocFather) => {
        const type: string = this.getType(param);

        if (param?.comment?.shortText) {
          comments.push(`<b>${param?.name}</b>: ${param.comment.shortText}`);
        }

        if (!type) {
          return param.name;
        }

        return `${param.name}${type}`
      }).join(', ');

    const accessorType = !signature
      ? ''
      : signature.kindString === 'Set signature'
        ? 'set '
        : signature.kindString === 'Get signature' ? 'get ' : '';

    return {
      code: methodArguments
        ? `${flag}${accessorType}${signature.name}(${methodArguments})${signatureType}`
        : `${flag}${accessorType}${signature.name}()${signatureType}`,
      comments,
      decorators
    };
  }

  /**
   * Iterates through the object, searches for the keyName
   * and returns an array of results matching the keyName.
   *
   * @param inspectedObject - The object to get inspected
   * @param keyName - The name of the key to be found
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
