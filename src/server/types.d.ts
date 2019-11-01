declare namespace Express {
  export interface Request {
    data: object;
    status: object;
    user: object | undefined;
  }
  export interface Response {
    data: object;
    status: object;
    user: object;
    then: any;
    catch: any;
    finally: any;
    [Symbol.toStringTag]: string;
  }
}
