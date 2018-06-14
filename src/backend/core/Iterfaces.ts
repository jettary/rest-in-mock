export interface EntityInterface {
  orderBys?: string[];
  fallbackOrderBys?: string[];

  validate(): ModelError[];
}

export interface ControllerInterface {
  base?: string;

  list(): Promise<any>;
  index(id: number): Promise<any>;
  create(): Promise<any>;
  update(id: number): Promise<any>;
  remove(id: number): Promise<any>;
}

export interface ModelFieldError {
  constraint: string;
  message: string;
}

export interface ModelError {
  field: string;
  errors: ModelFieldError[];
}
