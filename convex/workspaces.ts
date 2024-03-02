import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createWorkspace = mutation({
  args: {
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) {
      throw new Error("Unauthenticated call to mutation");
    }

    const workspace = await ctx.db
      .query("workspaces")
      .withIndex("by_workspace_owner", (q) =>
        q.eq("workspaceOwnerId", user._id)
      )
      .collect();

    if (workspace.length !== 0) {
      console.log(workspace);
      const exist = workspace.find((obj) => obj.title === args.title);
      if (exist) return;
    }

    const newWorkspace = await ctx.db.insert("workspaces", {
      workspaceOwnerId: user._id,
      title: args.title,
    });

    return newWorkspace;
  },
});

export const listWorkspaces = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) {
      throw new Error("Unauthenticated call to mutation");
    }

    const workspaces = await ctx.db
      .query("workspaces")
      .withIndex("by_workspace_owner", (q) =>
        q.eq("workspaceOwnerId", user._id)
      )
      .collect();
    return workspaces.map(({ title }) => ({
      label: title,
    }));
  },
});
