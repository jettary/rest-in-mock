import { ModelError } from './Iterfaces';

export class GeneralException {

  protected message: string;
  protected stack: any;
  protected code: string;
  protected extra: object = {};

  constructor(code, message, extra = {}) {
    const err = new Error(message);

    this.message = message;
    this.stack = err.stack;
    this.code = code;
    this.extra = extra;
  }

  public toJSON() {
    return {
      error: { code: this.code, message: this.message, extra: this.extra }
    };
  }

}

export class NotFound extends GeneralException {

  constructor(message) {
    super('NOT_FOUND', message);
  }

}

export class InvalidRequest extends GeneralException {

  constructor(errors: ModelError[], message: string = 'Invalid request') {
    super('INVALID_REQUEST', message, { errors });
  }

}
