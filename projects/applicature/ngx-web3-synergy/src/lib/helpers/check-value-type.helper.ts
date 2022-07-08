import { W3sEnumsTypeTransformer } from '../types';

/** @enum */
export enum W3S_VALUE_TYPES {
  ARRAY = 'Array',
  BLOB = 'Blob',
  BOOLEAN = 'Boolean',
  FILE = 'File',
  FUNCTION = 'Function',
  NUMBER = 'Number',
  OBJECT = 'Object',
  STRING = 'String'
}

/** @enum */
export type W3sValueType = W3sEnumsTypeTransformer<W3S_VALUE_TYPES.ARRAY
  | W3S_VALUE_TYPES.BLOB
  | W3S_VALUE_TYPES.BOOLEAN
  | W3S_VALUE_TYPES.FILE
  | W3S_VALUE_TYPES.FUNCTION
  | W3S_VALUE_TYPES.NUMBER
  | W3S_VALUE_TYPES.OBJECT
  | W3S_VALUE_TYPES.STRING>;

/**
 * It's better alternative for typeof.
 * @param value - value to check type.
 * @param type - expected type of Value;
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function w3sCheckValueType<T = any>(value: T, type: W3sValueType): boolean {
  const valueType = Object.prototype.toString.call(value).slice(8, -1);

  return value !== undefined && value !== null && valueType === type;
}
