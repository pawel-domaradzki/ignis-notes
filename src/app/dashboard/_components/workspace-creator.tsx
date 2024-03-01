import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { FormEvent, useState } from "react";
import { CreateWorkspaceForm } from "./create-workspace-form";

export function WorkspaceCreator() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Create a Workspace</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Let&apos;s build a Workspace</DialogTitle>
          <DialogDescription>
            Boost your productivity by making it easier for everyone to access
            boards in one location.
          </DialogDescription>
        </DialogHeader>
        <CreateWorkspaceForm />
      </DialogContent>
    </Dialog>
  );
}
