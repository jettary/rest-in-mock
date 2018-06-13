export interface EntityInterface {
  orderBys?: string[];
  fallbackOrderBys?: string[];

  validate(): boolean;
}