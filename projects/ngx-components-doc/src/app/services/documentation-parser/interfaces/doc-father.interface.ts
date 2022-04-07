export interface DocFather {
  id: number,
  name: string;
  kind: number;
  kindString?: string;
  flags?: {
    isPublic?: boolean;
    isOptional?: boolean;
    isPrivate?: boolean;
    isProtected?: boolean;
    isConstructorProperty?: any;
  };
  originalName?: string;
  decorators?: DocDecorator[],
  children?: DocFather[] | any[];
  groups?: any[];
  sources?: any[];
  implementedTypes?: any;
  type?: {
    name: string;
  };
  comment?: {
    shortText?: string;
  };
  signatures?: DocFather[];
  parameters?: DocFather[];
  [key: string]: any;
}


export interface DocDecorator {
  name: string;
  arguments: {
    hostPropertyName: string;
    bindingPropertyName: string;
  }
}
