export interface DocFather {
  id: number,
  name: string;
  kind: number;
  kindString?: string;
  defaultValue: string;
  flags?: DocFlags;
  originalName?: string;
  decorators?: DocDecorator[],
  children?: DocFather[] | any[];
  groups?: any[];
  sources?: any[];
  implementedTypes?: any;
  type?: DocType;
  comment?: {
    shortText?: string;
    returns?: string;
  };
  signatures?: DocFather[];
  setSignature?: DocFather[];
  getSignature?: DocFather[];
  indexSignature?: DocFather;
  parameters?: DocFather[];
  [key: string]: any;
}

export interface DocType {
  id?: number;
  name?: string;
  qualifiedName?: string;
  elementType?: DocType;
  queryType?: DocType;
  declaration?: DocFather;
  typeArguments?: DocTypeVal[];
  types?: DocTypeVal[];
  type?: 'array' | 'reference' | 'query' | 'union' | 'reflection' | 'intrinsic';
}

export interface DocTypeVal {
  type: string;
  value?: string;
  name?: string;
}

export interface DocFlags {
  isPublic?: boolean;
  isOptional?: boolean;
  isPrivate?: boolean;
  isProtected?: boolean;
  isConstructorProperty?: boolean;
}

export interface DocDecorator {
  name: string;
  arguments: {
    hostPropertyName?: string;
    bindingPropertyName?: string;
    opts?: string;
    selector?: string;
  }
}
