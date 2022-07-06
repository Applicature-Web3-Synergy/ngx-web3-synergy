export type EnumsTypeTransformer<T> = T extends string ? `${T}` : never;
