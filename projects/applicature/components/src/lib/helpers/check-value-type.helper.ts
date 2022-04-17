/** @enum */
export enum AUC_VALUE_TYPES {
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
export type AucValueType = AUC_VALUE_TYPES.ARRAY
  | AUC_VALUE_TYPES.BLOB
  | AUC_VALUE_TYPES.BOOLEAN
  | AUC_VALUE_TYPES.FILE
  | AUC_VALUE_TYPES.FUNCTION
  | AUC_VALUE_TYPES.NUMBER
  | AUC_VALUE_TYPES.OBJECT
  | AUC_VALUE_TYPES.STRING;

/**
 * It's better alternative for typeof.
 * @param value - value to check type.
 * @param type - expected type of Value;
 */
export function aucCheckValueType<T = any>(value: T, type: AucValueType): boolean {
  const valueType = Object.prototype.toString.call(value).slice(8, -1);

  return value !== undefined && value !== null && valueType === type;
}
