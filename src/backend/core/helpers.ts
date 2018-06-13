import * as _ from 'lodash';
import { Request } from 'express';
import { SelectQueryBuilder } from 'typeorm';
import { EntityInterface } from './Iterfaces';

export const isClassOf = (pretenderKlass: any, expectedKlass: any): boolean => {
  if (!pretenderKlass.name) {
    return false;
  }

  if (pretenderKlass.name === expectedKlass.name) {
    return true;
  } else {
    return isClassOf(pretenderKlass.__proto__, expectedKlass);
  }
};

export const applyRequest = (queryBuilder: SelectQueryBuilder<any>, entityKlass: any, req: Request) => {
  const fallbackOrderBys = entityKlass.fallbackOrderBys || [];
  let orderBys = entityKlass.orderBys || [];

  if ('orderBy' in req.query && _.isString(req.query.orderBy)) {
    orderBys = req.query.orderBy.split(',').filter(orderBy => {
      return _.find(orderBys, value => {
        return value.replace(/-/g, '') === orderBy.replace(/-/g, '');
      });
    });
  }

  for (const orderBy of orderBys) {
    queryBuilder.addOrderBy(
      `"${orderBy.replace(/-/g, '')}"`,
      '-' === orderBy[0] ? 'ASC' : 'DESC'
    );
  }
  for (const orderBy of fallbackOrderBys) {
    queryBuilder.addOrderBy(
      `"${orderBy.replace(/-/g, '')}"`,
      '-' === orderBy[0] ? 'ASC' : 'DESC'
    );
  }
};
