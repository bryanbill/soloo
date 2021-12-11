import { Hook, HookDecorator, HttpResponseUnauthorized } from "@foal/core";

export function Admin(): HookDecorator {
  return Hook(async (ctx, services) => {
    if (!ctx.user.role.includes("admin")) {
      return new HttpResponseUnauthorized();
    }
  });
}
