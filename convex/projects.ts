import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createProject = mutation({
  args: {
    title: v.string(),
    authorId: v.string(),
    workspace: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const document = await ctx.db.insert("projects", {
      title: args.title,
      authorId: args.authorId,
      workspace: args.workspace,
    });

    return document;
  },
});
