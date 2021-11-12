// std
import { ok, strictEqual } from 'assert';

// 3p
import { Context, createController, getHttpMethod, getPath, isHttpResponseOK } from '@foal/core';

// App
import { AppcenterController } from './appcenter.controller';

describe('AppcenterController', () => {

  let controller: AppcenterController;

  beforeEach(() => controller = createController(AppcenterController));

  describe('has a "foo" method that', () => {

    it('should handle requests at GET /.', () => {
      strictEqual(getHttpMethod(AppcenterController, 'foo'), 'GET');
      strictEqual(getPath(AppcenterController, 'foo'), '/');
    });

    it('should return an HttpResponseOK.', () => {
      const ctx = new Context({});
      ok(isHttpResponseOK(controller.foo(ctx)));
    });

  });

});
