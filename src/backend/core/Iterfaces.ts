export type RouterAction = 'list' | 'index' | 'create' | 'update' | 'remove';

export interface EntityInterface {
  orderBys?: string[];
  fallbackOrderBys?: string[];

  validate(): ModelError[];
}

export interface ControllerInterface {
  base?: string;

  list(...args): Promise<any>;
  index(id: number, ...args): Promise<any>;
  create(...args): Promise<any>;
  update(id: number, ...args): Promise<any>;
  remove(id: number, ...args): Promise<any>;
}

export interface ModelFieldError {
  constraint: string;
  message: string;
}

export interface ModelError {
  field: string;
  errors: ModelFieldError[];
}

export interface MockInterface {
  /* [REQUIRED]
  * type of field:
  * - number
  * - string
  * - boolean
  * - array<number | string | boolean | object>, should be defined by `properties`
  * - object<T>, should be defined by `properties`
  * */
  type: 'number';

  /* [REQUIRED]
  * required, default to true
  * */
  required: boolean;

  /* [OPTIONAL]
  * Could be value represented as `null`
  * */
  nullAllowed: boolean;

  /* [OPTIONAL]
  * Format for each type
  * - number: integer | float
  * - string: [DEFAULT] hex | name | date | datetime
  * */
  format?: 'integer' | 'float';

  /* [OPTIONAL]
  * Defines every item of `array`
  * OR properties of `object`
  * */
  properties?: MockInterface; // for type 'array' or 'object'
}

export interface MockModel {
  [key: string]: MockInterface;
}
