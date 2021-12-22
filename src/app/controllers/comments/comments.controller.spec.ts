// std
import { ok, strictEqual } from 'assert';

// 3p
import { Context, createController, getHttpMethod, getPath, isHttpResponseOK } from '@foal/core';

// App
import { CommentsController } from './comments.controller';

describe('CommentsController', () => {

  let controller: CommentsController;

  beforeEach(() => controller = createController(CommentsController));

  describe('has a "foo" method that', () => {

    it('should handle requests at GET /.', () => {
      strictEqual(getHttpMethod(CommentsController, 'foo'), 'GET');
      strictEqual(getPath(CommentsController, 'foo'), '/');
    });

    it('should return an HttpResponseOK.', () => {
      const ctx = new Context({});
      ok(isHttpResponseOK(controller.foo(ctx)));
    });

  });

});
