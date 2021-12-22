// std
import { ok, strictEqual } from 'assert';

// 3p
import { Context, createController, getHttpMethod, getPath, isHttpResponseOK } from '@foal/core';

// App
import { IssuesController } from './issues.controller';

describe('IssuesController', () => {

  let controller: IssuesController;

  beforeEach(() => controller = createController(IssuesController));

  describe('has a "foo" method that', () => {

    it('should handle requests at GET /.', () => {
      strictEqual(getHttpMethod(IssuesController, 'foo'), 'GET');
      strictEqual(getPath(IssuesController, 'foo'), '/');
    });

    it('should return an HttpResponseOK.', () => {
      const ctx = new Context({});
      ok(isHttpResponseOK(controller.foo(ctx)));
    });

  });

});
