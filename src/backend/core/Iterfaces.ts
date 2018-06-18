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
