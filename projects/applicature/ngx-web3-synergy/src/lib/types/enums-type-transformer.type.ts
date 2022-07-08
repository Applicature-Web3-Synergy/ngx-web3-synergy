export type W3sEnumsTypeTransformer<T> = T extends string ? `${T}` : never;
