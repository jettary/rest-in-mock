import * as _ from 'lodash';
import { Request } from 'express';
import { SelectQueryBuilder } from 'typeorm';
import { GeneralException } from './Exceptions';

export const LIMIT = 50;
export const OFFSET = 0;

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
  // sort / orderBy
  const orderBys = getOrderBys(entityKlass, req);
  for (const orderBy of orderBys) {
    queryBuilder.addOrderBy(
      `"${orderBy.replace(/-/g, '')}"`,
      '-' === orderBy[0] ? 'ASC' : 'DESC'
    );
  }

  // paginate
  const limitOffset = getLimitOffset(req);
  queryBuilder
    .limit(limitOffset.limit)
    .offset(limitOffset.offset);

};

function getOrderBys(entityKlass: any, req: Request): string[] {

  const fallbackOrderBys = entityKlass.fallbackOrderBys || [];
  let orderBys = entityKlass.orderBys || [];

  if ('orderBy' in req.query && _.isString(req.query.orderBy)) {
    orderBys = req.query.orderBy.split(',').filter(orderBy => {
      return _.find(orderBys, value => {
        return value.replace(/-/g, '') === orderBy.replace(/-/g, '');
      });
    });
  }

  if (orderBys.length === 0) {
    orderBys = entityKlass.orderBys || [];
  }

  return orderBys.concat(fallbackOrderBys);
}

function getLimitOffset(req: Request): { limit: number, offset: number } {
  const limit = 'limit' in req.query ? parseInt(req.query.limit, 10) : LIMIT;
  const offset = 'offset' in req.query ? parseInt(req.query.offset, 10) : OFFSET;

  if (!_.isSafeInteger(limit) || limit < 0) {
    throw new GeneralException('INVALID_REQUEST', `"limit" should be finite positive number`);
  }

  if (!_.isSafeInteger(offset) || offset < 0) {
    throw new GeneralException('INVALID_REQUEST', `"offset" should be finite positive number`);
  }

  return { limit, offset };
}
