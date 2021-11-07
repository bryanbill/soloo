export const credentialsSchema = {
  type: "object",
  properties: {
    username: { type: "string" },
  },
  required: ["username"],
  additionalProperties: false,
};
