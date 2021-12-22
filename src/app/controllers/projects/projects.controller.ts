import {
  ApiUseTag,
  Context,
  Get,
  HttpResponseBadRequest,
  HttpResponseNoContent,
  HttpResponseOK,
  Post,
  Put,
  ValidateBody,
} from "@foal/core";
import { JWTRequired } from "@foal/jwt";
import { fetchUser } from "@foal/typeorm";
import { create } from "domain";
import { In } from "typeorm";
import { Project, User } from "../../entities";
import { issuePartial } from "../../helpers/utils/serializers/issues";
import {
  createEntity,
  findEntityOrThrow,
  updateEntity,
} from "../../helpers/utils/typeorm";

@ApiUseTag("Projects")
@JWTRequired({ cookie: true, user: fetchUser(User) })
export class ProjectsController {
  @Get("/")
  async getProject(ctx: Context) {
    try {
      if (ctx.user.projectId) {
        const project = await findEntityOrThrow(Project, ctx.user.projectId, {
          relations: ["users", "issues"],
        });
        return new HttpResponseOK({
          project: {
            ...project,
            issues:
              project.issues.length > 0 ? project.issues.map(issuePartial) : [],
          },
        });
      }
      ctx.request.body = {
        name: "Project",
        description: "Projection",
        url: "https://test.pro",
        category: "Software",
      };
      const payload = {
        ...ctx.request.body,
        users: [await User.findOne(ctx.user.id)],
      };
      const project = await createEntity(Project, payload);
      return new HttpResponseOK({
        project: {
          ...project,
          issues:
            project.issues? project.issues.map(issuePartial) : [],
        },
      });
    } catch (err) {
      console.log(err);
      return new HttpResponseBadRequest();
    }
  }

  @Post("/")
  @ValidateBody({
    properties: {
      name: { type: "string" },
      description: { type: "string" },
      url: { type: "string" },
      category: { type: "string" },
      users: {
        type: "array",
        items: { type: "number" },
      },
    },
  })
  async createProject(ctx: Context) {
    try {
      // get user object for each user id
      let users: User[] = [];
      for (let i = 0; i < ctx.request.body.users.length; i++) {
        users.push(await findEntityOrThrow(User, ctx.request.body.users[i]));
      }
      //mutate the original payload removing user ids
      delete ctx.request.body.users;
      const payload = {
        ...ctx.request.body,
        users,
      };
      console.log(payload);
      const project = await createEntity(Project, payload);
      return new HttpResponseOK(project);
    } catch (err) {
      console.log(err);
      return new HttpResponseBadRequest();
    }
  }

  @Put("/")
  async updateProject(ctx: Context) {
    try {
      const project = await updateEntity(
        Project,
        ctx.user.projectId,
        ctx.request.body
      );

      return new HttpResponseOK(project);
    } catch (err) {
      console.log(err);
      return new HttpResponseBadRequest();
    }
  }
}
