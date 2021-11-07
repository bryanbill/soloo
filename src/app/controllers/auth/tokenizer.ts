import { getSecretOrPrivateKey } from "@foal/jwt";
import { sign } from "jsonwebtoken";

export const signToken = (payload) =>
  sign(payload, getSecretOrPrivateKey(), {
    expiresIn: "365d",
  });
