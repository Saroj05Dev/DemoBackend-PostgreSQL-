import { db } from "../db/index.js";
import { users } from "../schemas/User.js";
import { eq } from "drizzle-orm";

export const userRepository = {
  async create(userData) {
    const [newUser] = await db.insert(users).values(userData).returning();
    return newUser;
  },

  async findByEmail(email) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  },

  async findById(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  },

  async updateById(id, updateData) {
    const [updatedUser] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  },

  async deleteById(id) {
    const [deletedUser] = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();
    return deletedUser;
  },
};