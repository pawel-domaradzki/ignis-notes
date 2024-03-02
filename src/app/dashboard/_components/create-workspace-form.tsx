"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

const formSchema = z.object({
  workspaceTitle: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function CreateWorkspaceForm() {
  const createWorkspace = useMutation(api.workspaces.createWorkspace);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workspaceTitle: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createWorkspace({
        title: values.workspaceTitle,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="workspaceTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Workspace name..." {...field} />
              </FormControl>
              <FormDescription>This is your workspace name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="block ml-auto">
          Create a Workspace
        </Button>
      </form>
    </Form>
  );
}
