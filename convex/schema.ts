import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({ 
  workspaces: defineTable({
    workspaceOwnerId: v.id("users"),
    title: v.string(),
  }),
  projects: defineTable({
    title: v.string(),
     authorId: v.string(),
     workspace: v.id("workspaces"),
  }).index("by_workspace", ["workspace"]),
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
});
