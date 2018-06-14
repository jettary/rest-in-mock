import {ModelError} from "./Iterfaces";

export class GeneralException extends Error {

  protected code: string;
  protected msg: string;
  protected extra: object = {};

  constructor(code, message, extra = {}) {
    super(message);

    this.code = code;
    this.msg = message;
    this.extra = extra;
  }

  public toJSON() {
    return {
      error: { code: this.code, message: this.msg, extra: this.extra }
    };
  }

}

export class NotFound extends GeneralException {

  constructor(message) {
    super('NOT_FOUND', message);
  }

}

export class InvalidRerquest extends GeneralException {

  constructor(errors: ModelError[], message: string = 'Invalid request') {
    super('INVALID_REQUEST', message, { errors });
  }

}
