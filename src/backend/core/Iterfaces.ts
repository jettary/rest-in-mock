export interface EntityInterface {
  orderBys?: string[];
  fallbackOrderBys?: string[];

  validate(): string[];
}

export interface ControllerInterface {
  base?: string;

  list(): Promise<any>;
  index(id: number): Promise<any>;
  create(): Promise<any>;
  update(id: number): Promise<any>;
  remove(id: number): Promise<any>;
}
