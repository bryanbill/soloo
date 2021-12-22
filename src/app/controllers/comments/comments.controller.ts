import {
  ApiUseTag,
  Context,
  Delete,
  Get,
  HttpResponseOK,
  Post,
  Put,
  ValidateBody,
  ValidatePathParam,
} from "@foal/core";
import { JWTRequired } from "@foal/jwt";
import { fetchUser } from "@foal/typeorm";
import { Comment, User } from "../../entities";
import {
  createEntity,
  deleteEntity,
  updateEntity,
} from "../../helpers/utils/typeorm";

@ApiUseTag("Comments")
@JWTRequired({ cookie: true, user: fetchUser(User) })
export class CommentsController {
  @Get("/")
  async getComments(ctx: Context) {
    const comments = await Comment.find({
      relations: ["user", "issue"],
    });
    return new HttpResponseOK(comments);
  }

  @Post("/")
  @ValidateBody({
    properties: {
      body: { type: "string" },
      issueId: { type: "number" },
    },
  })
  async createComment(ctx: Context) {
    const payload = {
      ...ctx.request.body,
      userId: ctx.user.id,
    };
    const comment = await createEntity(Comment, payload);
    return new HttpResponseOK(comment);
  }

  @Put("/:id")
  @ValidatePathParam("id", new Comment())
  @ValidateBody({
    properties: {},
  })
  async updateComment(ctx: Context) {
    const comment = await updateEntity(
      Comment,
      ctx.request.params.id,
      ctx.request.body
    );
    return new HttpResponseOK(comment);
  }
  @Delete("/:id")
  @ValidatePathParam("id", new Comment())
  async deleteComment(ctx: Context) {
    const comment = await deleteEntity(Comment, ctx.request.params.id);
    return new HttpResponseOK(comment);
  }
}
