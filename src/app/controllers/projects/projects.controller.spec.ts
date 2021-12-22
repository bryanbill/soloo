// std
import { ok, strictEqual } from 'assert';

// 3p
import { Context, createController, getHttpMethod, getPath, isHttpResponseOK } from '@foal/core';

// App
import { ProjectsController } from './projects.controller';

describe('ProjectsController', () => {

  let controller: ProjectsController;

  beforeEach(() => controller = createController(ProjectsController));

  describe('has a "foo" method that', () => {

    it('should handle requests at GET /.', () => {
      strictEqual(getHttpMethod(ProjectsController, 'foo'), 'GET');
      strictEqual(getPath(ProjectsController, 'foo'), '/');
    });

    it('should return an HttpResponseOK.', () => {
      const ctx = new Context({});
      ok(isHttpResponseOK(controller.foo(ctx)));
    });

  });

});
