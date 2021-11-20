// 3p
// import { hashPassword } from '@foal/core';
import { createConnection } from "typeorm";
// App
import { User } from "../app/entities";

export const schema = {
  additionalProperties: false,
  properties: {
    email: { type: "string", format: "email" },
    phone: { type: "string" },
    name: { type: "string" },
    username: { type: "string" },
  },
  required: ["email", "phone", "username", "name"],
  type: "object",
};

export async function main(args: {
  email: string;
  phone: string;
  name: string;
  username: string;
}) {
  const connection = await createConnection();

  try {
    const user = new User();
    user.email = args.email;
    user.phone = args.phone;
    user.name = args.name;
    user.username = args.username;
    user.role = ["admin"];
    user.isDeleted = false;
    user.createdAt = new Date();
    user.updatedAt = new Date();

    console.log(await user.save());
  } catch (error) {
    error = error;
    console.log(error.message);
  } finally {
    await connection.close();
  }
}
